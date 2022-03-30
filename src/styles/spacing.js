import * as Mixins from './mixins';

const DepartmentButtonPerRow = 2;
export const DepartmentButtonWidth = 0.85* (Mixins.windowWidth/DepartmentButtonPerRow);
export const DepartmentButtonHorizontalMargin = (Mixins.windowWidth-2*DepartmentButtonWidth)/(2*DepartmentButtonPerRow);