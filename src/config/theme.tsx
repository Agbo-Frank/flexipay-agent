import { createTheme } from '@mui/material'

const theme = createTheme({
    palette:{
        primary: {
            main: '#1900FE'
        },
        secondary: {
            main: '#FF5000'
        }
    },
    typography: {
        fontFamily: ['Montserrat', 'sans-serif'].join(',')
    },
    components: {
        // MuiMenuItem: {
        //     styleOverrides: {
        //         root: {
        //             fontSize: 14,
        //             '&:hover': {
        //                 backgroundColor: 'transparent',
        //                 color: '#1900FE'
        //             },
        //             '&:focus': {
        //                 backgroundColor: 'transparent',
        //                 color: '#1900FE',
        //             },
        //         }
        //     }
        // },
        MuiSelect: {
            styleOverrides: {
                select: {
                    // padding: "13px 10px !important",
                    fontSize: 14,
                    height: 5
                }
            }
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    fontSize: 15,
                    textTransform: 'capitalize',
                    '&:hover': {
                        backgroundColor: '#1900FE',
                        color: 'white',
                    },
                    '&:focus': {
                        backgroundColor: '#1900FE',
                        color: 'white',
                    },
                }
            }
        },
        MuiAutocomplete: {
            styleOverrides: {
                inputRoot: {
                    padding: 3,
                    fontSize: 14,
                }
            }
        },
        MuiMenu: {
            styleOverrides: {
                root: {
                    boxShadow: '4px 6px 38px -13px rgba(0,0,0,0.75)'
                }
            }
        },
        MuiTableRow: {
            styleOverrides: {
                hover: {
                    boxShadow: '4px 6px 38px -13px rgba(0,0,0,0.75)'
                }
            }
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                root: {
                    textTransform: 'capitalize',
                    borderRadius: 5
                }
            }
        },
        MuiTextField: {
            styleOverrides: {
                root: { 
                    borderRadius: 3,
                    [`& fieldset`]: {
                        borderRadius: 10,
                        // border: '1px solid  #1900FE'
                    },
                }
            }
        }
        // MuiTableHead: {

        // }
      },
})

export default theme