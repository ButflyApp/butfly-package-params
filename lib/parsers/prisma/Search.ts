 function prismaSearchParamParser(search: string, validFields: string[]): Record<string, any> | { OR: undefined } {
    if (!search || !validFields) {
        return { OR: undefined };
    }
    const searchParam: { OR: Array<Record<string, any>> } = { OR: [] };
    validFields.map((field) => searchParam.OR.push({ [field]: { contains: search, mode: "insensitive" } }));
    return searchParam;
}

export { prismaSearchParamParser }