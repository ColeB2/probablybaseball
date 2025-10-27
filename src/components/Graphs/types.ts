interface Margins {
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    marginLeft?: number;
}

type RotationAngle = -90 | -45 | 0 | 45 | 90;
type DataLabelRotationAngle = -90 | 0 | 90;
type BarLabelRotationAngle = -90 | 0 | 90;

export type {
    BarLabelRotationAngle,
    DataLabelRotationAngle,
    Margins,
    RotationAngle,
}