function capitalize(value: string | null | undefined): string {
    if(!value) {
        return "";
    }
    return `${value.toLowerCase().charAt(0).toUpperCase()}${value.slice(1)}`;
}

export {
    capitalize
};
