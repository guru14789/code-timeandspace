import { CodeMetrics, FunctionMetrics, ClassMetrics, CodeSmell, AlgorithmicPattern } from '../types';
import { analyzeTimeComplexity, analyzeSpaceComplexity } from './complexityAnalyzer';

export function analyzeCode(code: string): CodeMetrics {
  const lines = code.split('\n');
  const linesOfCode = lines.filter(line => line.trim() && !line.trim().startsWith('//')).length;
  
  // Analyze functions
  const functions = analyzeFunctions(code);
  
  // Analyze classes
  const classes = analyzeClasses(code);
  
  // Calculate cyclomatic complexity
  const cyclomaticComplexity = calculateCyclomaticComplexity(code);
  
  // Calculate cognitive complexity
  const cognitiveComplexity = calculateCognitiveComplexity(code);
  
  // Calculate maintainability index
  const maintainabilityIndex = calculateMaintainabilityIndex(code, cyclomaticComplexity, linesOfCode);
  
  // Calculate Halstead metrics
  const halsteadMetrics = calculateHalsteadMetrics(code);
  
  // Analyze time and space complexity
  const timeComplexity = analyzeTimeComplexity(code);
  const spaceComplexity = analyzeSpaceComplexity(code);
  
  // Detect algorithmic patterns
  const algorithmicPatterns = detectAlgorithmicPatterns(code);
  
  // Detect code smells (enhanced with complexity analysis)
  const codeSmells = detectCodeSmells(code, functions, classes, timeComplexity, spaceComplexity);
  
  return {
    cyclomaticComplexity,
    linesOfCode,
    maintainabilityIndex,
    cognitiveComplexity,
    timeComplexity,
    spaceComplexity,
    halsteadMetrics,
    functions,
    classes,
    duplicatedLines: 0, // Simplified for demo
    testCoverage: Math.random() * 100, // Mock data
    codeSmells,
    algorithmicPatterns
  };
}

function analyzeFunctions(code: string): FunctionMetrics[] {
  const functionRegex = /(?:function\s+(\w+)|(\w+)\s*[:=]\s*(?:function|\([^)]*\)\s*=>)|(?:async\s+)?function\s*\*?\s*(\w+))/g;
  const functions: FunctionMetrics[] = [];
  let match;
  
  while ((match = functionRegex.exec(code)) !== null) {
    const name = match[1] || match[2] || match[3] || 'anonymous';
    const startIndex = match.index;
    const startLine = code.substring(0, startIndex).split('\n').length;
    
    // Find function body
    let braceCount = 0;
    let endIndex = startIndex;
    let inFunction = false;
    
    for (let i = startIndex; i < code.length; i++) {
      if (code[i] === '{') {
        braceCount++;
        inFunction = true;
      } else if (code[i] === '}') {
        braceCount--;
        if (inFunction && braceCount === 0) {
          endIndex = i;
          break;
        }
      }
    }
    
    const functionCode = code.substring(startIndex, endIndex + 1);
    const endLine = code.substring(0, endIndex).split('\n').length;
    const functionLines = functionCode.split('\n').filter(line => line.trim()).length;
    
    // Count parameters
    const paramMatch = functionCode.match(/\(([^)]*)\)/);
    const parameters = paramMatch ? paramMatch[1].split(',').filter(p => p.trim()).length : 0;
    
    // Analyze complexity for this function
    const timeComplexity = analyzeTimeComplexity(functionCode, name);
    const spaceComplexity = analyzeSpaceComplexity(functionCode, name);
    
    // Determine algorithm type
    const algorithmType = determineAlgorithmType(functionCode);
    
    functions.push({
      name,
      complexity: calculateCyclomaticComplexity(functionCode),
      linesOfCode: functionLines,
      parameters,
      startLine,
      endLine,
      timeComplexity,
      spaceComplexity,
      algorithmType
    });
  }
  
  return functions;
}

function analyzeClasses(code: string): ClassMetrics[] {
  const classRegex = /class\s+(\w+)/g;
  const classes: ClassMetrics[] = [];
  let match;
  
  while ((match = classRegex.exec(code)) !== null) {
    const name = match[1];
    const startIndex = match.index;
    const startLine = code.substring(0, startIndex).split('\n').length;
    
    // Find class body
    let braceCount = 0;
    let endIndex = startIndex;
    let inClass = false;
    
    for (let i = startIndex; i < code.length; i++) {
      if (code[i] === '{') {
        braceCount++;
        inClass = true;
      } else if (code[i] === '}') {
        braceCount--;
        if (inClass && braceCount === 0) {
          endIndex = i;
          break;
        }
      }
    }
    
    const classCode = code.substring(startIndex, endIndex + 1);
    const endLine = code.substring(0, endIndex).split('\n').length;
    const classLines = classCode.split('\n').filter(line => line.trim()).length;
    
    // Count methods
    const methodMatches = classCode.match(/\w+\s*\([^)]*\)\s*{/g) || [];
    const methods = methodMatches.length;
    
    // Analyze complexity for this class
    const timeComplexity = analyzeTimeComplexity(classCode, name);
    const spaceComplexity = analyzeSpaceComplexity(classCode, name);
    
    classes.push({
      name,
      methods,
      complexity: calculateCyclomaticComplexity(classCode),
      linesOfCode: classLines,
      startLine,
      endLine,
      timeComplexity,
      spaceComplexity
    });
  }
  
  return classes;
}

function calculateCyclomaticComplexity(code: string): number {
  // Count decision points
  const decisionPoints = [
    /\bif\b/g,
    /\belse\s+if\b/g,
    /\bwhile\b/g,
    /\bfor\b/g,
    /\bdo\b/g,
    /\bswitch\b/g,
    /\bcase\b/g,
    /\bcatch\b/g,
    /\?\s*[^:]*:/g, // ternary operator
    /&&/g,
    /\|\|/g
  ];
  
  let complexity = 1; // Base complexity
  
  decisionPoints.forEach(regex => {
    const matches = code.match(regex);
    if (matches) {
      complexity += matches.length;
    }
  });
  
  return complexity;
}

function calculateCognitiveComplexity(code: string): number {
  let complexity = 0;
  let nestingLevel = 0;
  
  const lines = code.split('\n');
  
  lines.forEach(line => {
    const trimmed = line.trim();
    
    // Increment nesting for blocks
    if (trimmed.includes('{')) {
      nestingLevel++;
    }
    
    // Decrement nesting for closing blocks
    if (trimmed.includes('}')) {
      nestingLevel = Math.max(0, nestingLevel - 1);
    }
    
    // Add complexity for control structures
    if (/\b(if|while|for|switch|catch)\b/.test(trimmed)) {
      complexity += 1 + nestingLevel;
    }
    
    // Add complexity for logical operators
    const logicalOps = (trimmed.match(/&&|\|\|/g) || []).length;
    complexity += logicalOps;
  });
  
  return complexity;
}

function calculateMaintainabilityIndex(code: string, complexity: number, linesOfCode: number): number {
  // Simplified maintainability index calculation
  const halsteadVolume = calculateHalsteadMetrics(code).volume;
  
  let maintainabilityIndex = 171 - 5.2 * Math.log(halsteadVolume) - 0.23 * complexity - 16.2 * Math.log(linesOfCode);
  
  // Normalize to 0-100 scale
  maintainabilityIndex = Math.max(0, Math.min(100, maintainabilityIndex));
  
  return Math.round(maintainabilityIndex);
}

function calculateHalsteadMetrics(code: string) {
  // Simplified Halstead metrics
  const operators = code.match(/[+\-*/%=<>!&|^~?:;,(){}[\]]/g) || [];
  const operands = code.match(/\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/g) || [];
  
  const uniqueOperators = new Set(operators);
  const uniqueOperands = new Set(operands);
  
  const vocabulary = uniqueOperators.size + uniqueOperands.size;
  const length = operators.length + operands.length;
  const difficulty = (uniqueOperators.size / 2) * (operands.length / uniqueOperands.size);
  const volume = length * Math.log2(vocabulary || 1);
  const effort = difficulty * volume;
  
  return {
    vocabulary,
    length,
    difficulty: Math.round(difficulty * 10) / 10,
    effort: Math.round(effort),
    volume: Math.round(volume)
  };
}

function detectCodeSmells(code: string, functions: FunctionMetrics[], classes: ClassMetrics[], timeComplexity: any, spaceComplexity: any): CodeSmell[] {
  const smells: CodeSmell[] = [];
  
  // Long functions
  functions.forEach(func => {
    if (func.linesOfCode > 50) {
      smells.push({
        type: 'long-function',
        severity: func.linesOfCode > 100 ? 'high' : 'medium',
        message: `Function '${func.name}' is too long (${func.linesOfCode} lines)`,
        line: func.startLine,
        suggestion: 'Consider breaking this function into smaller, more focused functions',
        complexityImpact: {
          time: func.timeComplexity.bigO,
          space: func.spaceComplexity.bigO
        }
      });
    }
  });
  
  // Complex functions
  functions.forEach(func => {
    if (func.complexity > 10) {
      smells.push({
        type: 'complex-function',
        severity: func.complexity > 20 ? 'high' : 'medium',
        message: `Function '${func.name}' has high complexity (${func.complexity})`,
        line: func.startLine,
        suggestion: 'Reduce complexity by extracting logic into separate functions',
        complexityImpact: {
          time: func.timeComplexity.bigO,
          space: func.spaceComplexity.bigO
        }
      });
    }
  });
  
  // Inefficient algorithms
  functions.forEach(func => {
    if (func.timeComplexity.bigO.includes('n²') || func.timeComplexity.bigO.includes('2^n')) {
      smells.push({
        type: 'inefficient-algorithm',
        severity: func.timeComplexity.bigO.includes('2^n') ? 'high' : 'medium',
        message: `Function '${func.name}' has inefficient time complexity: ${func.timeComplexity.bigO}`,
        line: func.startLine,
        suggestion: `Consider optimizing algorithm. Current: ${func.timeComplexity.explanation}`,
        complexityImpact: {
          time: func.timeComplexity.bigO,
          space: func.spaceComplexity.bigO
        }
      });
    }
  });
  
  // Nested loops
  const nestedLoopPattern = /for[\s\S]*?for[\s\S]*?for/g;
  if (nestedLoopPattern.test(code)) {
    smells.push({
      type: 'nested-loops',
      severity: 'high',
      message: 'Multiple nested loops detected - potential O(n³) complexity',
      suggestion: 'Consider algorithm optimization or data structure changes',
      complexityImpact: {
        time: 'O(n³)',
        space: 'O(1)'
      }
    });
  }
  
  // Long parameter lists
  functions.forEach(func => {
    if (func.parameters > 5) {
      smells.push({
        type: 'long-parameter-list',
        severity: func.parameters > 8 ? 'high' : 'medium',
        message: `Function '${func.name}' has too many parameters (${func.parameters})`,
        line: func.startLine,
        suggestion: 'Consider using an object parameter or breaking the function down'
      });
    }
  });
  
  // Large classes
  classes.forEach(cls => {
    if (cls.linesOfCode > 200) {
      smells.push({
        type: 'large-class',
        severity: cls.linesOfCode > 500 ? 'high' : 'medium',
        message: `Class '${cls.name}' is too large (${cls.linesOfCode} lines)`,
        line: cls.startLine,
        suggestion: 'Consider splitting this class into smaller, more focused classes',
        complexityImpact: {
          time: cls.timeComplexity.bigO,
          space: cls.spaceComplexity.bigO
        }
      });
    }
  });
  
  return smells;
}

function detectAlgorithmicPatterns(code: string): AlgorithmicPattern[] {
  const patterns: AlgorithmicPattern[] = [];
  
  // Detect sorting patterns
  if (/bubble.*sort|sort.*bubble/i.test(code)) {
    patterns.push({
      type: 'sorting',
      name: 'Bubble Sort',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      line: 1,
      confidence: 0.8,
      description: 'Bubble sort algorithm detected - inefficient for large datasets'
    });
  }
  
  if (/quick.*sort|sort.*quick/i.test(code)) {
    patterns.push({
      type: 'sorting',
      name: 'Quick Sort',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(log n)',
      line: 1,
      confidence: 0.8,
      description: 'Quick sort algorithm detected - efficient divide-and-conquer approach'
    });
  }
  
  // Detect searching patterns
  if (/binary.*search|search.*binary/i.test(code)) {
    patterns.push({
      type: 'searching',
      name: 'Binary Search',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      line: 1,
      confidence: 0.9,
      description: 'Binary search algorithm detected - efficient for sorted arrays'
    });
  }
  
  // Detect recursion patterns
  if (/fibonacci/i.test(code)) {
    patterns.push({
      type: 'recursion',
      name: 'Fibonacci',
      timeComplexity: 'O(2^n)',
      spaceComplexity: 'O(n)',
      line: 1,
      confidence: 0.9,
      description: 'Fibonacci recursion detected - consider memoization for optimization'
    });
  }
  
  return patterns;
}

function determineAlgorithmType(code: string): string {
  if (/sort/i.test(code)) return 'Sorting';
  if (/search/i.test(code)) return 'Searching';
  if (/recursive|recursion/i.test(code)) return 'Recursive';
  if (/dynamic.*programming|memoization/i.test(code)) return 'Dynamic Programming';
  if (/graph|tree|node/i.test(code)) return 'Graph/Tree';
  if (/hash|map|set/i.test(code)) return 'Hash Table';
  if (/for|while|loop/i.test(code)) return 'Iterative';
  return 'General';
}