import DatePicker from './datepicker.vue';
import Range from './rangeDatePicker.vue';
import Slider from './sliderDatePicker';

DatePicker.Range = Range;
DatePicker.Slider = Slider;

export { DatePicker as UxDatePicker, Range as UxRangeDatePicker, Slider as UxSliderDatePicker };
export default DatePicker;
