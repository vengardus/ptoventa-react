export const deviceTypes = {
    xmobile: 'extraMobile',
    mobile : 'mobile',
    tablet: 'tablet',
    laptop: 'laptop',
    desktop: 'desktop',
    tv: 'tv'
}

export const deviceSizes = {
    mobile:     640,    //576     small mobile (menos de 640son son los extra small, default)
    tablet:     768,   
    laptop:     1024, //992
    desktop:    1280, //1200
    tv:         1536     
};

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
