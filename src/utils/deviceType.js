import { deviceSizes, deviceTypes } from "../styles/breakpoints";

export const getDeviceType = () => {
    // const innerWidth = window.innerWidth;
    const innerWidth = window.screen.width;
    let device
    //console.log("the inner", innerWidth);
    if (innerWidth >= deviceSizes.tv) device = deviceTypes.tv
    else if (innerWidth >= deviceSizes.desktop) device = deviceTypes.desktop
    else if (innerWidth >= deviceSizes.laptop) device = deviceTypes.laptop
    else if (innerWidth >= deviceSizes.tablet) device = deviceTypes.tablet
    else if (innerWidth >= deviceSizes.mobile) device = deviceTypes.mobile
    else device = deviceTypes.mobile
    //console.log('device:', device)
    return device
};