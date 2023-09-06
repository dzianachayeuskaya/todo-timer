import { TimeRangeModel } from './TimeRangeModel';

export class TaskModel {
    id: string = '0';
    name: string = '';
    spentTime: string = '';
    timeRangeArray: Array<TimeRangeModel> = Array(new TimeRangeModel());
}
