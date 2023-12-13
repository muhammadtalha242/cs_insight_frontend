import styled from "styled-components";
import { Spacing } from "../../themes";

export const FilterContentContainer = styled.div`
    padding: ${Spacing.large} ${Spacing.larger};
    height: 100%;
`

export const InputNumberFilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
export const SelectFilterContainer = styled.div`
`


export const LabelFilterContainer = styled.label`
    text-align: start;
    margin-bottom: ${Spacing.medium};
    display: flex;
    justify-content: space-between;
    font-size: medium;
    font-weight: 600;
`
