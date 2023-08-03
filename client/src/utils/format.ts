export const formatTimeYtb = (second: number) => {
    var min = Math.floor(second / 60);
    var sec = second % 60;
    return min.toString().padStart(2, "0") + ":" + sec.toString().padStart(2, "0");
};
