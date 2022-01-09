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

export const strategies = [
    [
        [
            "w",
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false
        ],
        [
            "w",
            "l",
            false,
            false,
            false,
            false,
            false,
            false,
            false
        ],
        [
            "w",
            "l",
            false,
            "w",
            false,
            false,
            false,
            false,
            false
        ],
        [
            "w",
            "l",
            false,
            "w",
            "l",
            false,
            false,
            false,
            false
        ],
        [
            "w",
            "l",
            false,
            "w",
            "l",
            false,
            "w",
            false,
            false
        ],
        [
            "w",
            "l",
            false,
            "w",
            "l",
            false,
            "w",
            false,
            false
        ],
        [
            "w",
            "l",
            false,
            "w",
            "l",
            false,
            "w",
            false,
            false
        ],
        [
            "w",
            "l",
            false,
            "w",
            "l",
            false,
            "w",
            false,
            false
        ],
        [
            "w",
            "l",
            false,
            "w",
            "l",
            false,
            "w",
            false,
            false
        ]
    ]
]