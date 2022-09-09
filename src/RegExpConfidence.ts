export interface RegExpConfidenceExecArray extends RegExpExecArray {
  confidence: number;
}

export interface RegExpConfidenceTestResult {
  result: boolean;
  confidence: number;
}

const CONFIDENCE_MODIFIERS: Array<[RegExp, number]> = [
  [/\*/, 0.5], // zero or more instances
  [/\+/, 0.6], // one or more instances
  [/\?/, 0.7], // zero or one instance
  [/\^/, 1.2], // beginning of string
  [/\$/, 1.2], // end of string
];

/**
 * RegExp extension to calculate confidence of regexp expressions
 */
export class RegExpConfidence extends RegExp {
  /**
   * Calculates confidence of this regexp pattern
   */
  calculateConfidence(): number {
    let confidence = 1.0;
    let pattern = this.source;
    // TODO: add different confidence modifier based on character class
    // for example using single character classes does not drop confidence as much as
    // using for example word
    const characterClasses = (pattern.match(/\\[AbBcdDElLQrsSuwWxZ]/) || []).length;
    if(characterClasses > 0) {
      confidence = confidence * characterClasses * 0.9;
    }
    // now remove all escapes from the pattern
    pattern = pattern.replace(/\\/, '');

    for(const modifier of CONFIDENCE_MODIFIERS) {
      const matches =(pattern.match(modifier[0]) || []).length;
      if(matches > 0) {
        confidence = confidence * matches * modifier[1];
      }
    }

    // TODO: logical OR
    // TODO: Set of characters match []
    // TODO: repetition expressions
    // TODO: flags

    return confidence;
  }

  /**
   * RegExp exec with confidence included in the response
   *
   * @param string
   */
  exec(string: string): RegExpConfidenceExecArray | null {
    const execResult = super.exec(string) as RegExpConfidenceExecArray;
    execResult.confidence = this.calculateConfidence();
    return execResult;
  }

  /**
   * Test regex with confidence
   *
   * @param string
   */
  testc(string: string): RegExpConfidenceTestResult {
    return  {
      result: super.test(string),
      confidence: this.calculateConfidence()
    };
  }
}