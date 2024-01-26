const sizes = {
    mobile:     "640px",    //576px     small mobile (menos de 640son son los extra small, default)
    tablet:     "768px",   
    laptop:     "1024px", //992px
    desktop:    "1280px", //1200px
    tv:         "1536px"     
};

export const Device = {
    mobile:     `(min-width: ${sizes.mobile})`,
    tablet:     `(min-width: ${sizes.tablet})`,
    laptop:     `(min-width: ${sizes.laptop})`,
    desktop:    `(min-width: ${sizes.desktop})`,
    tv:         `(min-width: ${sizes.tv})`,
};
