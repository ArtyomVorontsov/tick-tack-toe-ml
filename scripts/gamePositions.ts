export const winPositions = [
    // | | |
    [
        true, false, false,
        true, false, false,
        true, false, false
    ],
    [
        false, true, false,
        false, true, false,
        false, true, false
    ],
    [
        false, false, true,
        false, false, true,
        false, false, true
    ],
    // / \
    [
        true, false, false,
        false, true, false,
        false, false, true
    ],
    [
        false, false, true,
        false, true, false,
        true, false, false
    ],
    // - - -
    [
        true, true, true,
        false, false, false,
        false, false, false
    ],
    [
        false, false, false,
        true, true, true,
        false, false, false
    ],
    [
        false, false, false,
        false, false, false,
        true, true, true
    ],
];


export const defaultPositions: (string | boolean)[] = [
    false, false, false,
    false, false, false,
    false, false, false
]

export const strategies = [[["l",false,false,false,false,false,false,false,false],["l",false,"w",false,false,false,false,false,false],["l",false,"w",false,false,false,false,"l",false],["l",false,"w",false,false,"w",false,"l",false],["l","l","w",false,false,"w",false,"l",false],["l","l","w",false,false,"w",false,"l","w"],["l","l","w",false,false,"w",false,"l","w"]],[[false,false,false,false,false,false,false,false,false],["w",false,false,false,false,false,false,false,false],["w",false,"l",false,false,false,false,false,false],["w",false,"l","w",false,false,false,false,false],["w",false,"l","w",false,false,false,"l",false],["w",false,"l","w",false,false,"w","l",false],["w",false,"l","w",false,false,"w","l",false]],[[false,false,false,false,false,false,false,false,false],[false,false,false,false,false,"w",false,false,false],[false,"l",false,false,false,"w",false,false,false],[false,"l",false,false,"w","w",false,false,false],[false,"l","l",false,"w","w",false,false,false],[false,"l","l","w","w","w",false,false,false],[false,"l","l","w","w","w",false,false,false]],[[false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,"w"],["l",false,false,false,false,false,false,false,"w"],["l",false,false,false,false,false,false,"w","w"],["l",false,false,false,"l",false,false,"w","w"],["l",false,false,false,"l",false,"w","w","w"],["l",false,false,false,"l",false,"w","w","w"]],[[false,false,false,false,false,false,false,false,false],[false,false,false,false,"l",false,false,false,false],[false,false,false,false,"l","w",false,false,false],[false,"l",false,false,"l","w",false,false,false],[false,"l",false,false,"l","w",false,"w",false],["l","l",false,false,"l","w",false,"w",false],["l","l","w",false,"l","w",false,"w",false],["l","l","w","l","l","w",false,"w",false],["l","l","w","l","l","w",false,"w","w"],["l","l","w","l","l","w",false,"w","w"]],[[false,false,false,false,false,false,false,false,false],[false,false,false,false,"l",false,false,false,false],[false,false,false,false,"l","w",false,false,false],[false,"l",false,false,"l","w",false,false,false],[false,"l",false,false,"l","w",false,"w",false],["l","l",false,false,"l","w",false,"w",false],["l","l","w",false,"l","w",false,"w",false],["l","l","w","l","l","w",false,"w",false],["l","l","w","l","l","w",false,"w","w"],["l","l","w","l","l","w",false,"w","w"]],[[false,false,false,false,false,false,false,false,false],[false,false,"w",false,false,false,false,false,false],[false,false,"w","l",false,false,false,false,false],["w",false,"w","l",false,false,false,false,false],["w",false,"w","l","l",false,false,false,false],["w","w","w","l","l",false,false,false,false],["w","w","w","l","l",false,false,false,false]],[[false,false,false,false,false,false,false,false,false],[false,false,false,"w",false,false,false,false,false],[false,false,"l","w",false,false,false,false,false],[false,false,"l","w","w",false,false,false,false],[false,false,"l","w","w","l",false,false,false],["w",false,"l","w","w","l",false,false,false],["w","l","l","w","w","l",false,false,false],["w","l","l","w","w","l","w",false,false],["w","l","l","w","w","l","w",false,false]],[[false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,"l",false],[false,false,false,"w",false,false,false,"l",false],[false,false,false,"w",false,false,"l","l",false],["w",false,false,"w",false,false,"l","l",false],["w",false,false,"w",false,"l","l","l",false],["w",false,false,"w",false,"l","l","l","w"],["w","l",false,"w",false,"l","l","l","w"],["w","l",false,"w","w","l","l","l","w"],["w","l",false,"w","w","l","l","l","w"]],[[false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,"w",false],[false,"l",false,false,false,false,false,"w",false],[false,"l",false,false,false,false,false,"w","w"],[false,"l",false,"l",false,false,false,"w","w"],[false,"l",false,"l",false,false,"w","w","w"],[false,"l",false,"l",false,false,"w","w","w"]],[[false,false,false,false,false,false,false,false,false],["w",false,false,false,false,false,false,false,false],["w",false,"l",false,false,false,false,false,false],["w",false,"l","w",false,false,false,false,false],["w",false,"l","w",false,false,"l",false,false],["w",false,"l","w","w",false,"l",false,false],["w",false,"l","w","w",false,"l","l",false],["w",false,"l","w","w",false,"l","l","w"],["w",false,"l","w","w",false,"l","l","w"]],[[false,false,false,false,false,false,false,false,false],["w",false,false,false,false,false,false,false,false],["w",false,false,false,false,"l",false,false,false],["w",false,false,false,"w","l",false,false,false],["w",false,false,"l","w","l",false,false,false],["w",false,false,"l","w","l",false,false,"w"],["w",false,false,"l","w","l",false,false,"w"]],[[false,false,false,false,false,false,false,false,false],[false,false,"w",false,false,false,false,false,false],[false,false,"w",false,"l",false,false,false,false],[false,false,"w",false,"l","w",false,false,false],["l",false,"w",false,"l","w",false,false,false],["l",false,"w",false,"l","w",false,false,"w"],["l",false,"w",false,"l","w",false,false,"w"]],[[false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,"w",false,false],[false,false,false,"l",false,false,"w",false,false],[false,false,false,"l","w",false,"w",false,false],["l",false,false,"l","w",false,"w",false,false],["l",false,"w","l","w",false,"w",false,false],["l",false,"w","l","w",false,"w",false,false]],[[false,false,false,false,false,false,false,false,false],[false,false,false,false,"w",false,false,false,false],[false,false,false,false,"w","l",false,false,false],["w",false,false,false,"w","l",false,false,false],["w",false,false,false,"w","l","l",false,false],["w",false,false,false,"w","l","l",false,"w"],["w",false,false,false,"w","l","l",false,"w"]],[[false,false,false,false,false,false,false,false,false],[false,false,false,false,"l",false,false,false,false],[false,"w",false,false,"l",false,false,false,false],[false,"w",false,false,"l",false,"l",false,false],["w","w",false,false,"l",false,"l",false,false],["w","w",false,false,"l",false,"l","l",false],["w","w","w",false,"l",false,"l","l",false],["w","w","w",false,"l",false,"l","l",false]],[[false,false,false,false,false,false,false,false,false],[false,false,false,false,"w",false,false,false,false],[false,false,false,false,"w",false,"l",false,false],[false,"w",false,false,"w",false,"l",false,false],[false,"w",false,false,"w",false,"l",false,"l"],[false,"w",false,"w","w",false,"l",false,"l"],["l","w",false,"w","w",false,"l",false,"l"],["l","w",false,"w","w","w","l",false,"l"],["l","w",false,"w","w","w","l",false,"l"]],[[false,false,false,false,false,false,false,false,false],[false,false,false,false,"l",false,false,false,false],["w",false,false,false,"l",false,false,false,false],["w",false,false,false,"l",false,"l",false,false],["w","w",false,false,"l",false,"l",false,false],["w","w",false,false,"l",false,"l","l",false],["w","w","w",false,"l",false,"l","l",false],["w","w","w",false,"l",false,"l","l",false]],[[false,false,false,false,false,false,false,false,false],[false,false,false,false,"l",false,false,false,false],["w",false,false,false,"l",false,false,false,false],["w",false,false,false,"l",false,"l",false,false],["w","w",false,false,"l",false,"l",false,false],["w","w",false,false,"l","l","l",false,false],["w","w","w",false,"l","l","l",false,false],["w","w","w",false,"l","l","l",false,false]],[[false,false,false,false,false,false,false,false,false],[false,false,false,false,"w",false,false,false,false],[false,false,false,"l","w",false,false,false,false],[false,false,false,"l","w",false,"w",false,false],["l",false,false,"l","w",false,"w",false,false],["l",false,"w","l","w",false,"w",false,false],["l",false,"w","l","w",false,"w",false,false]],[[false,false,false,false,false,false,false,false,false],[false,false,false,false,"w",false,false,false,false],["l",false,false,false,"w",false,false,false,false],["l",false,"w",false,"w",false,false,false,false],["l",false,"w","l","w",false,false,false,false],["l",false,"w","l","w",false,"w",false,false],["l",false,"w","l","w",false,"w",false,false]]]