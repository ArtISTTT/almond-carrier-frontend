export const toggleHtmlScroll = (disable: boolean) => {
    if (disable) {
        document.getElementsByTagName('html')[0].style.overflowY = 'hidden';
    } else {
        document.getElementsByTagName('html')[0].style.overflowY = 'auto';
    }
};
