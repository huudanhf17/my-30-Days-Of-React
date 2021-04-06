import { Pipe, PipeTransform } from '@angular/core';

interface AddressLike {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
}

@Pipe({
  name: 'formatAddress',
})
export class FormatAddressPipe implements PipeTransform {
  transform(adr: AddressLike): unknown {
    return `${adr.address1} ${adr.address2} ${adr.city} ${adr.state} ${adr.zip} ${adr.country}`;
  }
}
