import * as Mixins from './mixins';

//DepartmentButton
const DepartmentButtonPerRow = 2;
export const DepartmentButtonWidth = 0.85* (Mixins.windowWidth/DepartmentButtonPerRow);
export const DepartmentButtonHorizontalMargin = (Mixins.windowWidth-2*DepartmentButtonWidth)/(2*DepartmentButtonPerRow);

//ListButton
const ratioImage = 2/8;
const ratioText = 3/8;
const ratioQuantity = 1/8;
const ratioPrice = 2/8;

export const ListButtonWidth = Mixins.windowWidth / 1.3;
export const ListButtonHeight = Mixins.windowHeight /9;

export const ListButtonImageHeight = 0.8*ListButtonHeight;
export const ListButtonImageWidth = ListButtonImageHeight;
export const ListButtonImageSideMargin = (ratioImage * ListButtonWidth - ListButtonImageWidth)/2;

export const ListButtonTextWidth = 0.9*ratioText*ListButtonWidth;
export const ListButtonTextSideMargin = (ratioText*ListButtonWidth - ListButtonTextWidth)/2 ;

export const ListButtonQuantityWidth = 0.9*ratioQuantity*ListButtonWidth;
export const ListButtonQuantitySideMargin = (ratioQuantity*ListButtonWidth - ListButtonQuantityWidth)/2 ;

export const ListButtonPriceWidth = 0.9*ratioPrice*ListButtonWidth;
export const ListButtonPriceSideMargin = (ratioPrice*ListButtonWidth - ListButtonPriceWidth)/2 ;