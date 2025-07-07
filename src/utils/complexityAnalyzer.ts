import { ComplexityAnalysis, AlgorithmicPattern } from '../types';

export function analyzeTimeComplexity(code: string, functionName?: string): ComplexityAnalysis {
  const patterns = detectAlgorithmicPatterns(code);
  let bigO = 'O(1)';
  let worstCase = 'O(1)';
  let averageCase = 'O(1)';
  let bestCase = 'O(1)';
  let explanation = 'Constant time operation';
  let confidence = 0.9;
  let factors: string[] = [];

  // Analyze nested loops
  const nestedLoops = analyzeNestedLoops(code);
  if (nestedLoops.depth > 0) {
    const complexity = `O(n^${nestedLoops.depth})`;
    bigO = complexity;
    worstCase = complexity;
    averageCase = complexity;
    bestCase = nestedLoops.depth > 1 ? 'O(n)' : 'O(1)';
    explanation = `${nestedLoops.depth} nested loop${nestedLoops.depth > 1 ? 's' : ''} detected`;
    confidence = 0.85;
    factors.push(`${nestedLoops.depth} nested loops`);
  }

  // Analyze recursion
  const recursion = analyzeRecursion(code);
  if (recursion.isRecursive) {
    if (recursion.type === 'binary') {
      bigO = 'O(2^n)';
      worstCase = 'O(2^n)';
      averageCase = 'O(2^n)';
      bestCase = 'O(1)';
      explanation = 'Binary recursion with exponential growth';
      confidence = 0.8;
      factors.push('binary recursion');
    } else if (recursion.type === 'linear') {
      bigO = 'O(n)';
      worstCase = 'O(n)';
      averageCase = 'O(n)';
      bestCase = 'O(1)';
      explanation = 'Linear recursion';
      confidence = 0.85;
      factors.push('linear recursion');
    } else if (recursion.type === 'logarithmic') {
      bigO = 'O(log n)';
      worstCase = 'O(log n)';
      averageCase = 'O(log n)';
      bestCase = 'O(1)';
      explanation = 'Logarithmic recursion (divide and conquer)';
      confidence = 0.9;
      factors.push('divide and conquer');
    }
  }

  // Analyze sorting algorithms
  const sortingPattern = detectSortingAlgorithm(code);
  if (sortingPattern) {
    bigO = sortingPattern.timeComplexity;
    worstCase = sortingPattern.worstCase || sortingPattern.timeComplexity;
    averageCase = sortingPattern.averageCase || sortingPattern.timeComplexity;
    bestCase = sortingPattern.bestCase || 'O(n)';
    explanation = `${sortingPattern.name} sorting algorithm detected`;
    confidence = sortingPattern.confidence;
    factors.push(sortingPattern.name);
  }

  // Analyze searching algorithms
  const searchingPattern = detectSearchingAlgorithm(code);
  if (searchingPattern) {
    bigO = searchingPattern.timeComplexity;
    worstCase = searchingPattern.worstCase || searchingPattern.timeComplexity;
    averageCase = searchingPattern.averageCase || searchingPattern.timeComplexity;
    bestCase = searchingPattern.bestCase || 'O(1)';
    explanation = `${searchingPattern.name} searching algorithm detected`;
    confidence = searchingPattern.confidence;
    factors.push(searchingPattern.name);
  }

  // Analyze array operations
  const arrayOps = analyzeArrayOperations(code);
  if (arrayOps.hasLinearOperations) {
    if (bigO === 'O(1)') {
      bigO = 'O(n)';
      worstCase = 'O(n)';
      averageCase = 'O(n)';
      explanation = 'Linear array operations detected';
      factors.push('array iteration');
    }
  }

  return {
    bigO,
    worstCase,
    averageCase,
    bestCase,
    explanation,
    confidence,
    factors
  };
}

export function analyzeSpaceComplexity(code: string, functionName?: string): ComplexityAnalysis {
  let bigO = 'O(1)';
  let worstCase = 'O(1)';
  let averageCase = 'O(1)';
  let bestCase = 'O(1)';
  let explanation = 'Constant space usage';
  let confidence = 0.9;
  let factors: string[] = [];

  // Analyze recursion depth
  const recursion = analyzeRecursion(code);
  if (recursion.isRecursive) {
    if (recursion.type === 'binary') {
      bigO = 'O(n)';
      worstCase = 'O(n)';
      averageCase = 'O(n)';
      explanation = 'Recursive call stack space';
      confidence = 0.8;
      factors.push('recursive call stack');
    } else if (recursion.type === 'linear') {
      bigO = 'O(n)';
      worstCase = 'O(n)';
      averageCase = 'O(n)';
      explanation = 'Linear recursive call stack';
      confidence = 0.85;
      factors.push('linear recursion stack');
    } else if (recursion.type === 'logarithmic') {
      bigO = 'O(log n)';
      worstCase = 'O(log n)';
      averageCase = 'O(log n)';
      explanation = 'Logarithmic call stack depth';
      confidence = 0.9;
      factors.push('logarithmic stack');
    }
  }

  // Analyze data structure creation
  const dataStructures = analyzeDataStructures(code);
  if (dataStructures.hasArrayCreation) {
    bigO = 'O(n)';
    worstCase = 'O(n)';
    averageCase = 'O(n)';
    explanation = 'Array/object creation proportional to input';
    factors.push('dynamic data structures');
  }

  if (dataStructures.hasMatrixCreation) {
    bigO = 'O(n²)';
    worstCase = 'O(n²)';
    averageCase = 'O(n²)';
    explanation = '2D array/matrix creation';
    factors.push('2D data structures');
  }

  // Analyze memoization
  const memoization = analyzeMemoization(code);
  if (memoization.hasMemoization) {
    if (bigO === 'O(1)') {
      bigO = 'O(n)';
      worstCase = 'O(n)';
      averageCase = 'O(n)';
    }
    explanation += ' with memoization cache';
    factors.push('memoization cache');
  }

  return {
    bigO,
    worstCase,
    averageCase,
    bestCase,
    explanation,
    confidence,
    factors
  };
}

function analyzeNestedLoops(code: string): { depth: number; patterns: string[] } {
  const lines = code.split('\n');
  let maxDepth = 0;
  let currentDepth = 0;
  const patterns: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    
    // Detect for loops
    if (/\bfor\s*\(/.test(trimmed)) {
      currentDepth++;
      maxDepth = Math.max(maxDepth, currentDepth);
      patterns.push('for loop');
    }
    
    // Detect while loops
    if (/\bwhile\s*\(/.test(trimmed)) {
      currentDepth++;
      maxDepth = Math.max(maxDepth, currentDepth);
      patterns.push('while loop');
    }
    
    // Detect forEach
    if (/\.forEach\s*\(/.test(trimmed)) {
      currentDepth++;
      maxDepth = Math.max(maxDepth, currentDepth);
      patterns.push('forEach');
    }
    
    // Reset depth on closing braces
    if (trimmed === '}') {
      currentDepth = Math.max(0, currentDepth - 1);
    }
  }

  return { depth: maxDepth, patterns };
}

function analyzeRecursion(code: string): { isRecursive: boolean; type: string; depth?: number } {
  const functionNames = extractFunctionNames(code);
  
  for (const funcName of functionNames) {
    const funcRegex = new RegExp(`\\b${funcName}\\s*\\(`, 'g');
    const matches = code.match(funcRegex);
    
    if (matches && matches.length > 1) {
      // Determine recursion type
      if (code.includes(`${funcName}(`) && code.includes(`${funcName}(`)) {
        if (code.match(new RegExp(`${funcName}\\s*\\([^)]*\\).*${funcName}\\s*\\(`, 'g'))) {
          return { isRecursive: true, type: 'binary' };
        } else if (code.includes('/2') || code.includes('/ 2')) {
          return { isRecursive: true, type: 'logarithmic' };
        } else {
          return { isRecursive: true, type: 'linear' };
        }
      }
    }
  }
  
  return { isRecursive: false, type: 'none' };
}

function detectSortingAlgorithm(code: string): any {
  const sortingPatterns = [
    {
      name: 'Bubble Sort',
      pattern: /for.*for.*if.*>.*{[\s\S]*?}/,
      timeComplexity: 'O(n²)',
      worstCase: 'O(n²)',
      averageCase: 'O(n²)',
      bestCase: 'O(n)',
      confidence: 0.8
    },
    {
      name: 'Quick Sort',
      pattern: /partition|pivot/i,
      timeComplexity: 'O(n log n)',
      worstCase: 'O(n²)',
      averageCase: 'O(n log n)',
      bestCase: 'O(n log n)',
      confidence: 0.7
    },
    {
      name: 'Merge Sort',
      pattern: /merge.*sort|sort.*merge/i,
      timeComplexity: 'O(n log n)',
      worstCase: 'O(n log n)',
      averageCase: 'O(n log n)',
      bestCase: 'O(n log n)',
      confidence: 0.8
    },
    {
      name: 'Selection Sort',
      pattern: /min.*index|selection/i,
      timeComplexity: 'O(n²)',
      worstCase: 'O(n²)',
      averageCase: 'O(n²)',
      bestCase: 'O(n²)',
      confidence: 0.7
    }
  ];

  for (const pattern of sortingPatterns) {
    if (pattern.pattern.test(code)) {
      return pattern;
    }
  }

  return null;
}

function detectSearchingAlgorithm(code: string): any {
  const searchingPatterns = [
    {
      name: 'Binary Search',
      pattern: /binary.*search|search.*binary|mid.*=.*\+.*\/.*2/i,
      timeComplexity: 'O(log n)',
      worstCase: 'O(log n)',
      averageCase: 'O(log n)',
      bestCase: 'O(1)',
      confidence: 0.8
    },
    {
      name: 'Linear Search',
      pattern: /for.*length.*if.*===|indexOf|includes/,
      timeComplexity: 'O(n)',
      worstCase: 'O(n)',
      averageCase: 'O(n)',
      bestCase: 'O(1)',
      confidence: 0.7
    }
  ];

  for (const pattern of searchingPatterns) {
    if (pattern.pattern.test(code)) {
      return pattern;
    }
  }

  return null;
}

function analyzeArrayOperations(code: string): { hasLinearOperations: boolean; operations: string[] } {
  const operations: string[] = [];
  let hasLinearOperations = false;

  const linearOps = [
    'forEach', 'map', 'filter', 'reduce', 'find', 'some', 'every',
    'indexOf', 'includes', 'join', 'reverse', 'sort'
  ];

  for (const op of linearOps) {
    if (code.includes(`.${op}(`)) {
      operations.push(op);
      hasLinearOperations = true;
    }
  }

  return { hasLinearOperations, operations };
}

function analyzeDataStructures(code: string): { hasArrayCreation: boolean; hasMatrixCreation: boolean; structures: string[] } {
  const structures: string[] = [];
  let hasArrayCreation = false;
  let hasMatrixCreation = false;

  // Check for array creation
  if (/new Array\(|Array\.from\(|\[\s*\]|\[.*\]/.test(code)) {
    hasArrayCreation = true;
    structures.push('array');
  }

  // Check for 2D arrays
  if (/\[\s*\[|\]\s*\]/.test(code) || /Array.*Array/.test(code)) {
    hasMatrixCreation = true;
    structures.push('2D array');
  }

  // Check for objects/maps
  if (/new Map\(|new Set\(|new Object\(|\{\s*\}/.test(code)) {
    structures.push('object/map');
  }

  return { hasArrayCreation, hasMatrixCreation, structures };
}

function analyzeMemoization(code: string): { hasMemoization: boolean; type: string } {
  if (/memo|cache|Map|Set/.test(code) && /get|set|has/.test(code)) {
    return { hasMemoization: true, type: 'explicit' };
  }
  
  return { hasMemoization: false, type: 'none' };
}

function extractFunctionNames(code: string): string[] {
  const functionRegex = /(?:function\s+(\w+)|(\w+)\s*[:=]\s*(?:function|\([^)]*\)\s*=>)|(?:async\s+)?function\s*\*?\s*(\w+))/g;
  const names: string[] = [];
  let match;
  
  while ((match = functionRegex.exec(code)) !== null) {
    const name = match[1] || match[2] || match[3];
    if (name) names.push(name);
  }
  
  return names;
}

function detectAlgorithmicPatterns(code: string): AlgorithmicPattern[] {
  const patterns: AlgorithmicPattern[] = [];
  
  // Add pattern detection logic here
  // This would be expanded based on specific algorithmic patterns
  
  return patterns;
}