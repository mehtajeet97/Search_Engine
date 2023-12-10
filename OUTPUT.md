Boundary Conditions:

1. Punctuation and Special Characters:
   Provides Empty Result

2. Empty Search Query:
   Provides Empty Result as whitespaces are removed in code

3. Non-Existent Words:
   Provides Empty Result

4. Case Sensitivity:
   Case insensitive as all input is converted to lowercase in code

Testing :

```
$ npm start

> search-engine@1.0.0 start
> node app.js

Reading files from: /Users/jeetmehta/Downloads/Job_Search/Projects/Search_Engine/input
✔ Ostrich - Wikipedia.html
✔ Horse - Wikipedia.html
✔ Wolf - Wikipedia.html
✔ Dog - Wikipedia.html
✔ Cheetah - Wikipedia.html


Enter the word you want to searh (Enter ':q' to quit): ::

Search Result:
Not found


Enter the word you want to searh (Enter ':q' to quit):

Search Result:
Not found


Enter the word you want to searh (Enter ':q' to quit): telephone

Search Result:
Not found


Enter the word you want to searh (Enter ':q' to quit): hello there

Search Result:
Not found


Enter the word you want to searh (Enter ':q' to quit): how are you doing?

Search Result:
Not found


Enter the word you want to searh (Enter ':q' to quit): hands

Search Result:
┌─────────┬──────────────────────────┬────────────┐
│ (index) │        File Name         │ Occurrence │
├─────────┼──────────────────────────┼────────────┤
│    0    │ 'Horse - Wikipedia.html' │     22     │
└─────────┴──────────────────────────┴────────────┘


Enter the word you want to searh (Enter ':q' to quit): fastest

Search Result:
┌─────────┬────────────────────────────┬────────────┐
│ (index) │         File Name          │ Occurrence │
├─────────┼────────────────────────────┼────────────┤
│    0    │ 'Cheetah - Wikipedia.html' │     10     │
│    1    │  'Horse - Wikipedia.html'  │     3      │
│    2    │ 'Ostrich - Wikipedia.html' │     1      │
└─────────┴────────────────────────────┴────────────┘


Enter the word you want to searh (Enter ':q' to quit): animal

Search Result:
┌─────────┬────────────────────────────┬────────────┐
│ (index) │         File Name          │ Occurrence │
├─────────┼────────────────────────────┼────────────┤
│    0    │   'Dog - Wikipedia.html'   │     90     │
│    1    │  'Horse - Wikipedia.html'  │     86     │
│    2    │  'Wolf - Wikipedia.html'   │     48     │
│    3    │ 'Cheetah - Wikipedia.html' │     43     │
│    4    │ 'Ostrich - Wikipedia.html' │     12     │
└─────────┴────────────────────────────┴────────────┘


Enter the word you want to searh (Enter ':q' to quit): Animal

Search Result:
┌─────────┬────────────────────────────┬────────────┐
│ (index) │         File Name          │ Occurrence │
├─────────┼────────────────────────────┼────────────┤
│    0    │   'Dog - Wikipedia.html'   │     90     │
│    1    │  'Horse - Wikipedia.html'  │     86     │
│    2    │  'Wolf - Wikipedia.html'   │     48     │
│    3    │ 'Cheetah - Wikipedia.html' │     43     │
│    4    │ 'Ostrich - Wikipedia.html' │     12     │
└─────────┴────────────────────────────┴────────────┘


Enter the word you want to searh (Enter ':q' to quit): aNIMAl

Search Result:
┌─────────┬────────────────────────────┬────────────┐
│ (index) │         File Name          │ Occurrence │
├─────────┼────────────────────────────┼────────────┤
│    0    │   'Dog - Wikipedia.html'   │     90     │
│    1    │  'Horse - Wikipedia.html'  │     86     │
│    2    │  'Wolf - Wikipedia.html'   │     48     │
│    3    │ 'Cheetah - Wikipedia.html' │     43     │
│    4    │ 'Ostrich - Wikipedia.html' │     12     │
└─────────┴────────────────────────────┴────────────┘


Enter the word you want to searh (Enter ':q' to quit): ::q

Search Result:
Not found


Enter the word you want to searh (Enter ':q' to quit): :q
```
