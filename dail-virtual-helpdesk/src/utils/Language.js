import jsonEng from '@/local-data/data.json';
import jsonHin from '@/local-data/hindi_data.json';
import ConstData from '@/utils/Constants';

export default {
    readJson() {
        try {
            let selected_language = localStorage.getItem("language")
            if (selected_language == null || selected_language == undefined)
                return jsonEng
            else if (selected_language == 'hn')
                return jsonHin
            else
                return jsonEng
        } catch (error) {}
        return jsonEng
    },
    readConstValues() {
        try {
            let selected_language = localStorage.getItem("language")
            if (selected_language == null || selected_language == undefined){
                return ConstData.engValues
            }else if (selected_language == 'hn') {
                return ConstData.hindiValues
            }
            else {
                return ConstData.engValues
            }
        } catch (error) {}
        return ConstData.engValues
    }
}