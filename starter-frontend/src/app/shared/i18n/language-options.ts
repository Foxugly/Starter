import {LanguageEnumDto} from '../../api/generated/model/language-enum';

export interface LanguageOption {
  label: string;
  value: LanguageEnumDto;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  {label: 'English', value: LanguageEnumDto.En},
  {label: 'Français', value: LanguageEnumDto.Fr},
  {label: 'Nederlands', value: LanguageEnumDto.Nl},
  {label: 'Italiano', value: LanguageEnumDto.It},
  {label: 'Español', value: LanguageEnumDto.Es},
];
