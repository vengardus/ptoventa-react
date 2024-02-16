import { deviceSizes, deviceTypes } from "../styles/breakpoints";

export const getDeviceType = () => {
    // const innerWidth = window.innerWidth;
    const innerWidth = window.screen.width;
    console.log("the inner", innerWidth);
    if (innerWidth < deviceSizes.mobile) return(deviceTypes.mobile)
    else if (innerWidth < deviceSizes.tablet) return(deviceTypes.mobile)
    else if (innerWidth < deviceSizes.laptop) return(deviceTypes.tablet)
    else if (innerWidth < deviceSizes.desktop) return(deviceTypes.laptop)
    else if (innerWidth < deviceSizes.tv) return(deviceTypes.desktop)
    else return deviceTypes.tv
};