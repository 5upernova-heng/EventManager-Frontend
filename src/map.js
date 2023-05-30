export const maps = [
    {
        name: "西土城",
        src: "/src/assets/maps/base.jpg",
        imgWidth: 1421,
        imgHeight: 2002,
        nodeRange: [0, 93],
        scaleRange: [0.4, 1.8],
        fixedX: (x) => {
            return (x * 1421) / 26.4372;
        },

        fixedY: (y) => {
            return 2002 - (y * 2002) / 36.3141;
        },
    },
    {
        name: "西土城",
        src: "/src/assets/maps/base.jpg",
        imgWidth: 1421,
        imgHeight: 2002,
        nodeRange: [0, 93],
        scaleRange: [0.4, 1.8],
        fixedX: (x) => {
            return (x * 1421) / 26.4372;
        },

        fixedY: (y) => {
            return 2002 - (y * 2002) / 36.3141;
        },
    },
];
