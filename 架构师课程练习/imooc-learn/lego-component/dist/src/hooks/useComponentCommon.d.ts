import { CommonComponentProps } from '../defaultProps';
declare const useComponentCommon: (props: Readonly<Partial<CommonComponentProps & {
    isEditing: boolean;
}>>, picks: string[]) => {
    styleProps: import("vue").ComputedRef<Partial<Readonly<Partial<CommonComponentProps & {
        isEditing: boolean;
    }>>>>;
    handleClick: () => void;
};
export default useComponentCommon;
