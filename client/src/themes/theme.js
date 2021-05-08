import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    typography: {
        fontFamily: "Open Sans, sans-serif",
        fontSize: 14,
        button: {
            textTransform: "none",
            letterSpacing: 0,
            fontWeight: "bold",
            fontSize: 15
        }
    },
    overrides: {
        MuiInput: {
            input: {
                fontWeight: "bold",
                fontSize: 15
            }
        },
    },
    palette: {
        primary: {
            main: "#3A8DFF",
            contrastText: "#fff"
        },
        secondary: {
            main: "#B0B0B0",
        }
    }
});