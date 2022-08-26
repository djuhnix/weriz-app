import { makeStyles } from "tss-react/mui";

export const useBaseStyles = makeStyles()((theme ) => ({
    roundContainer: {
        borderRadius: '5px',
        padding: '0.8rem 0',
        backgroundColor: 'white',
        border: '1px solid #e0dfdc',
        [theme.breakpoints.values.xs]: {
            padding: 3
        }
    }
}));