# Vector

```
    npm install flexible-vector
```

flexible vector tooling for typescript and javascript. Supporting numeric component access, iterator protocol and flexible name based access.

```
    import {vector} from 'vector';

    let v1 = vector(1,2,3);
    v1[2];          // 3;
    v1.get(2);      // 3;
```

## supports flexible components accessors

use `vector2`, `vector3` and `vector4` to get augmented vectors that have special accessors.

`vector2` has x, y and permutations thereof
`vector3` has r,g,b and x,y,z and permutations thereof
`vector4` has r,g,b,a and x,y,z and permutations thereof

```
    import {vector3} from 'vector';

    let v1 = vector3(1,2,3);
    v1.rg;  // vector(1,2);

    // or even permutations
    v1.bgr; // vector(3,2,1);
```

## supports iterator pattern

```
    import {vector} from 'vector';

    let v1 = vector(1,2,3);
    [...v];         // [1,2,3];
```

## supports vector operations

-   `norm` the norm of the vector
-   `normalize` normalize the vector (length to 1 or 0)
-   `dot` dot product of two (equal size) vectors
-   `plus` addition of two (equal size) vectors
-   `minus` addition of two (equal size) vectors
-   `times` multiplication by a scalar
-   `equals` check whether a vector equals another

We also provide syntax sugar methods for the above. These destroy writability, but improve readability. Only use with proper intellisense.

-   `ⵙ`: dot product
-   `ⵜ`: addition
-   `ᜭ`: subtraction
-   `х`: multiplication

Note that these are exotic unicode characters and may not display well. In any case, they are probably not on your keyboard. However, they make code a bit more readable. You may even space it out a bit

```
    let v1 = vector(1, 2);
    let v2 = vector(1, 0);
    let v3 = (v1) .ᜭ (v2) .х (2);
    // vs
    let v4 = v1.minus(v2).times(2);
```
