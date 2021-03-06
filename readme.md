# Vector

```
    npm install flexible-vector
```

flexible vector tooling for typescript and javascript. Supporting numeric component access, iterator protocol and flexible name based access.

```
    import {vector} from 'flexible-vector';

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
    import {vector3} from 'flexible-vector';

    let v1 = vector3(1,2,3);
    v1.rg;  // vector(1,2);

    // or even permutations
    v1.bgr; // vector(3,2,1);
```

Setters are also supported, however, we discourage their use. Better to treat vectors as immutable.

```
    let v1 = vector3(1,2,3);
    v1[2] = 5;
    v1.xy = v1.yz;
    v1.z = 6;   //vector(2,5,6);
```

## supports iterator pattern

```
    import {vector} from 'flexible-vector';

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
