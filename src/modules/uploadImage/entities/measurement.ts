import { randomUUID } from 'crypto';

export interface MeasurementSchema {
  customer_code: string;
  measure_datetime: Date;
  measure_type: string;
  image_url?: string;
  measure_uuid?: string;
  has_confirmed?: boolean;
  measure_value?: number;
  image?: string;
}

export class Measurement {
  private props: MeasurementSchema;

  constructor(props: MeasurementSchema) {
    this.props = {
      ...props,
      measure_uuid: props.measure_uuid || randomUUID(),
      measure_value: props.measure_value || 0,
      has_confirmed: props.has_confirmed || false,
      image_url: props.image_url || '',
      image: props.image || '',
    };
  }

  get measure_uuid(): string {
    return this.props.measure_uuid;
  }

  get image_url(): string {
    return this.props.image_url;
  }

  set image_url(image_url: string) {
    this.props.image_url = image_url;
  }
  get image(): string {
    return this.props.image;
  }

  set image(image: string) {
    this.props.image = image;
  }

  get customer_code(): string {
    return this.props.customer_code;
  }

  set customer_code(customer_code: string) {
    this.props.customer_code = customer_code;
  }

  get measure_datetime(): Date {
    return this.props.measure_datetime;
  }

  set measure_datetime(measure_datetime: Date) {
    this.props.measure_datetime = measure_datetime;
  }
  get has_confirmed(): boolean {
    return this.props.has_confirmed;
  }

  set has_confirmed(has_confirmed: boolean) {
    this.props.has_confirmed = has_confirmed;
  }

  get measure_type(): string {
    return this.props.measure_type;
  }

  set measure_type(measure_type: 'WATER' | 'GAS') {
    this.props.measure_type = measure_type;
  }

  get measure_value(): number {
    return this.props.measure_value;
  }

  set measure_value(measure_value: number) {
    this.props.measure_value = measure_value;
  }
}
