export const formatPrice = (price, isCompany = false) => {
    return `${Math.round(price).toLocaleString()} kr${isCompany ? ' exkl. moms' : ''}`;
};
