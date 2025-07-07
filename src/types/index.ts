export interface CodeMetrics {
  cyclomaticComplexity: number;
  linesOfCode: number;
  maintainabilityIndex: number;
  cognitiveComplexity: number;
  timeComplexity: ComplexityAnalysis;
  spaceComplexity: ComplexityAnalysis;
  halsteadMetrics: {
    vocabulary: number;
    length: number;
    difficulty: number;
    effort: number;
    volume: number;
  };
  functions: FunctionMetrics[];
  classes: ClassMetrics[];
  duplicatedLines: number;
  testCoverage: number;
  codeSmells: CodeSmell[];
  algorithmicPatterns: AlgorithmicPattern[];
}

export interface ComplexityAnalysis {
  bigO: string;
  worstCase: string;
  averageCase: string;
  bestCase: string;
  explanation: string;
  confidence: number;
  factors: string[];
}

export interface FunctionMetrics {
  name: string;
  complexity: number;
  linesOfCode: number;
  parameters: number;
  startLine: number;
  endLine: number;
  timeComplexity: ComplexityAnalysis;
  spaceComplexity: ComplexityAnalysis;
  algorithmType: string;
}

export interface ClassMetrics {
  name: string;
  methods: number;
  complexity: number;
  linesOfCode: number;
  startLine: number;
  endLine: number;
  timeComplexity: ComplexityAnalysis;
  spaceComplexity: ComplexityAnalysis;
}

export interface AlgorithmicPattern {
  type: 'sorting' | 'searching' | 'recursion' | 'iteration' | 'dynamic-programming' | 'graph' | 'tree' | 'hash-table';
  name: string;
  timeComplexity: string;
  spaceComplexity: string;
  line: number;
  confidence: number;
  description: string;
}

export interface CodeSmell {
  type: 'long-function' | 'complex-function' | 'duplicate-code' | 'large-class' | 'long-parameter-list' | 'inefficient-algorithm' | 'memory-leak' | 'nested-loops';
  severity: 'low' | 'medium' | 'high';
  message: string;
  line?: number;
  suggestion: string;
  complexityImpact?: {
    time: string;
    space: string;
  };
}

export interface AnalysisHistory {
  id: string;
  timestamp: Date;
  metrics: CodeMetrics;
  codeLength: number;
}