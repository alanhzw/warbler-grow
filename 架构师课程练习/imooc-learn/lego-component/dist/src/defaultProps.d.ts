export interface CommonComponentProps {
    actionType: string;
    url: string;
    height: string;
    width: string;
    paddingLeft: string;
    paddingRight: string;
    paddingTop: string;
    paddingBottom: string;
    borderStyle: string;
    borderColor: string;
    borderWidth: string;
    borderRadius: string;
    boxShadow: string;
    opacity: string;
    position: string;
    top: string;
    left: string;
    right: string;
    bottom: string;
}
export declare const commonDefaultProps: CommonComponentProps;
export interface TextComponentProps extends CommonComponentProps {
    text: string;
    fontSize: string;
    fontFamily: string;
    fontWeight: string;
    fontStyle: string;
    textDecoration: string;
    lineHeight: string;
    textAlign: string;
    color: string;
    backgroundColor: string;
}
export declare type PartialTextComponentProps = Partial<TextComponentProps>;
export declare const textDefaultProps: TextComponentProps;
export declare const isEditingProp: {
    isEditing: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare const textStylePropNames: string[];
export declare const transformToComponentProps: <T extends {}>(props: T) => { [P in keyof T]: {
    type: StringConstructor;
    default: T[keyof T];
}; } & {
    isEditing: {
        type: BooleanConstructor;
        default: boolean;
    };
};
