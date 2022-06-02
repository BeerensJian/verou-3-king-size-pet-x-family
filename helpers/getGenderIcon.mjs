const getGenderIcon = (gender) => {
    if (gender === "male") {
        return `fa fa-mars`
    } else {
        return `fa fa-venus`
    }
}

export default getGenderIcon;