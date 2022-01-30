"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strategies = exports.defaultPositions = exports.winPositions = void 0;
exports.winPositions = [
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
exports.defaultPositions = [
    false, false, false,
    false, false, false,
    false, false, false
];
exports.strategies = [
    [
        [
            false,
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
];
//# sourceMappingURL=gamePositions.js.map