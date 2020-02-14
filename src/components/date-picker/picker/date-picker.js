import Picker from "../picker";
import DatePickerPanel from "../panel/Date/date";
export default {
  name: "CalenDarPicker",
  mixins: [Picker],
  props: {
    type: {
      default: "date"
    }
  },
  components: {
    DatePickerPanel
  },
  computed: {
    panel() {
      const isRange = this.type === 'daterange' || this.type === 'datetimerange';
      return isRange ? 'RangeDatePickerPanel' : 'DatePickerPanel';
    },
    ownPickerProps() {
      return this.options;
    }
  }
}
