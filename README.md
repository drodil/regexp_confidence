# RegExp confidence

Library used to calculate regular expression confidence level. 

Regular expressions are used to match or test strings against patterns. When combining regular expressions with for example image-to-text results to find specific things from image, the confidence level of the detection should also count permissive regex has been used. This library extends the default regular expression class with functionality to get confidence level of the matched regular expression. 

The functionality is straight forward:
- Using wildcards, character classes or permissive flags decreases the confidence
- Using exact matches and start/end of the string patterns increases the confidence
- Confidence is returned between 0.0 and 1.0

## Calculation rules

TBD

## WIP & Contributing

This project is work in progress and all contributions are welcome. 

## Licence

MIT