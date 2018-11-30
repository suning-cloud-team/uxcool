import DatePicker from './datepicker.vue';
import Range from './rangeDatePicker.vue';
import Month from './monthPicker';
import Slider from './sliderDatePicker';

DatePicker.Range = Range;
DatePicker.Slider = Slider;
DatePicker.Month = Month;

export { DatePicker as UxDatePicker, Range as UxRangeDatePicker, Slider as UxSliderDatePicker };
export default DatePicker;
