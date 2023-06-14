import chalk from "chalk"

export const chalkLog = (message, color = "yellow") => {
    color = getColor(color)
    console.log(chalk[color](message))
}

const getColor = (type) => {
    switch (type) {
        case "success":
            return "green"
        case "error":
            return "red"
        case "warning":
            return "yellow"
        case "info":
            return "blue"
        default:
            return type
    }
}

export const LOG_TYPE = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
}
