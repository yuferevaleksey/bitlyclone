import { Dto } from '../../dto/dto';
import { ApiProperty } from '@nestjs/swagger';

export class LinkViewsByDay extends Dto<LinkViewsByDay> {
  @ApiProperty({
    description: 'Link short code',
    type: String,
  })
  linkCode: string;

  @ApiProperty({
    description: 'Count view per day',
    type: Number,
  })
  count: number;

  @ApiProperty({
    description: 'Date of link view',
    type: Date,
  })
  viewDate: Date;
}

export class LinkViewsByDayResponse extends Dto<LinkViewsByDayResponse> {
  @ApiProperty({
    description: 'Link statistic',
    type: [LinkViewsByDay],
  })
  linkStatistic: LinkViewsByDay[];
}
