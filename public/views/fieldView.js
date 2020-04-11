import {
    cellSize,
    centeringShiftX,
    centeringShiftY,
    drawImage
} from '../utilities/drawingHelpers.js';

export default class FieldView {
    static draw(ctx, field) {
        const image = document.getElementById('fieldCellImage');

        for (let y = 0; y < field.height; ++y) {
            for (let x = 0; x < field.width; ++x) {
                const pixelX = centeringShiftX + x * cellSize;
                const pixelY = centeringShiftY + y * cellSize;
                drawImage(ctx, image, pixelX, pixelY, cellSize - 1, cellSize - 1, field.color);
            }
        }
    }
}