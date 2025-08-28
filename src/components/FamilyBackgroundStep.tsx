import React, { useState } from 'react';
import { Home } from 'lucide-react';
import { FormField } from './FormField';
import { CustomDropdown } from './CustomDropdown';

interface FamilyBackgroundData {
  maritalStatus: string;
  children: string;
  wantChildren: string;
  nationality: string;
  motherTongue: string;
  languagesKnown: string;
  country: string;
  city: string;
}

interface FamilyBackgroundStepProps {
  data: FamilyBackgroundData;
  onChange: (data: Partial<FamilyBackgroundData>) => void;
  showErrors?: boolean;
  errors?: any;
}

export const FamilyBackgroundStep: React.FC<FamilyBackgroundStepProps> = ({ data, onChange, showErrors, errors = {} }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  React.useEffect(() => {
    if (!openDropdown) return;
    const handleClickOutside = (event: MouseEvent) => {
      const dropdownMenus = document.querySelectorAll('.custom-dropdown-menu');
      let clickedInside = false;
      dropdownMenus.forEach(menu => {
        if (menu.contains(event.target as Node)) {
          clickedInside = true;
        }
      });
      if (!clickedInside) setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);
  
  const maritalOptions = [
    { value: 'Never Married', label: 'Never Married' },
    { value: 'Divorced', label: 'Divorced' },
    { value: 'Widowed', label: 'Widowed' },
    { value: 'Other', label: 'Other' },
  ];

  const childrenOptions = [
    { value: 'No', label: 'No Children' },
    { value: '1', label: '1 Child' },
    { value: '2', label: '2 Children' },
    { value: '3+', label: '3+ Children' },
  ];
  
  const wantChildrenOptions = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
    { value: 'Maybe', label: 'Maybe' },
  ];

  const nationalityOptions = [
      { value: 'afghanistan', label: 'Afghanistan' },
      { value: 'aland-islands', label: 'Åland Islands' },
      { value: 'albania', label: 'Albania' },
      { value: 'algeria', label: 'Algeria' },
      { value: 'american-samoa', label: 'American Samoa' },
      { value: 'andorra', label: 'Andorra' },
      { value: 'angola', label: 'Angola' },
      { value: 'anguilla', label: 'Anguilla' },
      { value: 'antarctica', label: 'Antarctica' },
      { value: 'antigua-and-barbuda', label: 'Antigua and Barbuda' },
      { value: 'argentina', label: 'Argentina' },
      { value: 'armenia', label: 'Armenia' },
      { value: 'aruba', label: 'Aruba' },
      { value: 'australia', label: 'Australia' },
      { value: 'austria', label: 'Austria' },
      { value: 'azerbaijan', label: 'Azerbaijan' },
      { value: 'bahamas', label: 'Bahamas' },
      { value: 'bahrain', label: 'Bahrain' },
      { value: 'bangladesh', label: 'Bangladesh' },
      { value: 'barbados', label: 'Barbados' },
      { value: 'belarus', label: 'Belarus' },
      { value: 'belgium', label: 'Belgium' },
      { value: 'belize', label: 'Belize' },
      { value: 'benin', label: 'Benin' },
      { value: 'bermuda', label: 'Bermuda' },
      { value: 'bhutan', label: 'Bhutan' },
      { value: 'bolivia', label: 'Bolivia' },
      { value: 'bonaire-sint-eustatius-and-saba', label: 'Bonaire, Sint Eustatius and Saba' },
      { value: 'bosnia-and-herzegovina', label: 'Bosnia and Herzegovina' },
      { value: 'botswana', label: 'Botswana' },
      { value: 'bouvet-island', label: 'Bouvet Island' },
      { value: 'brazil', label: 'Brazil' },
      { value: 'british-indian-ocean-territory', label: 'British Indian Ocean Territory' },
      { value: 'brunei-darussalam', label: 'Brunei Darussalam' },
      { value: 'bulgaria', label: 'Bulgaria' },
      { value: 'burkina-faso', label: 'Burkina Faso' },
      { value: 'burundi', label: 'Burundi' },
      { value: 'cabo-verde', label: 'Cabo Verde' },
      { value: 'cambodia', label: 'Cambodia' },
      { value: 'cameroon', label: 'Cameroon' },
      { value: 'canada', label: 'Canada' },
      { value: 'cayman-islands', label: 'Cayman Islands' },
      { value: 'central-african-republic', label: 'Central African Republic' },
      { value: 'chad', label: 'Chad' },
      { value: 'chile', label: 'Chile' },
      { value: 'china', label: 'China' },
      { value: 'christmas-island', label: 'Christmas Island' },
      { value: 'cocos-keeling-islands', label: 'Cocos (Keeling) Islands' },
      { value: 'colombia', label: 'Colombia' },
      { value: 'comoros', label: 'Comoros' },
      { value: 'congo', label: 'Congo' },
      { value: 'congo-democratic-republic', label: 'Congo (Democratic Republic)' },
      { value: 'cook-islands', label: 'Cook Islands' },
      { value: 'costa-rica', label: 'Costa Rica' },
      { value: 'croatia', label: 'Croatia' },
      { value: 'cuba', label: 'Cuba' },
      { value: 'curacao', label: 'Curaçao' },
      { value: 'cyprus', label: 'Cyprus' },
      { value: 'czechia', label: 'Czechia' },
      { value: 'denmark', label: 'Denmark' },
      { value: 'djibouti', label: 'Djibouti' },
      { value: 'dominica', label: 'Dominica' },
      { value: 'dominican-republic', label: 'Dominican Republic' },
      { value: 'ecuador', label: 'Ecuador' },
      { value: 'egypt', label: 'Egypt' },
      { value: 'el-salvador', label: 'El Salvador' },
      { value: 'equatorial-guinea', label: 'Equatorial Guinea' },
      { value: 'eritrea', label: 'Eritrea' },
      { value: 'estonia', label: 'Estonia' },
      { value: 'eswatini', label: 'Eswatini' },
      { value: 'ethiopia', label: 'Ethiopia' },
      { value: 'falkland-islands', label: 'Falkland Islands (Malvinas)' },
      { value: 'faroe-islands', label: 'Faroe Islands' },
      { value: 'fiji', label: 'Fiji' },
      { value: 'finland', label: 'Finland' },
      { value: 'france', label: 'France' },
      { value: 'french-guiana', label: 'French Guiana' },
      { value: 'french-polynesia', label: 'French Polynesia' },
      { value: 'french-southern-territories', label: 'French Southern Territories' },
      { value: 'gabon', label: 'Gabon' },
      { value: 'gambia', label: 'Gambia' },
      { value: 'georgia', label: 'Georgia' },
      { value: 'germany', label: 'Germany' },
      { value: 'ghana', label: 'Ghana' },
      { value: 'gibraltar', label: 'Gibraltar' },
      { value: 'greece', label: 'Greece' },
      { value: 'greenland', label: 'Greenland' },
      { value: 'grenada', label: 'Grenada' },
      { value: 'guadeloupe', label: 'Guadeloupe' },
      { value: 'guam', label: 'Guam' },
      { value: 'guatemala', label: 'Guatemala' },
      { value: 'guernsey', label: 'Guernsey' },
      { value: 'guinea', label: 'Guinea' },
      { value: 'guinea-bissau', label: 'Guinea-Bissau' },
      { value: 'guyana', label: 'Guyana' },
      { value: 'haiti', label: 'Haiti' },
      { value: 'heard-island-and-mcdonald-islands', label: 'Heard Island and McDonald Islands' },
      { value: 'holy-see', label: 'Holy See' },
      { value: 'honduras', label: 'Honduras' },
      { value: 'hong-kong', label: 'Hong Kong' },
      { value: 'hungary', label: 'Hungary' },
      { value: 'iceland', label: 'Iceland' },
      { value: 'india', label: 'India' },
      { value: 'indonesia', label: 'Indonesia' },
      { value: 'iran', label: 'Iran' },
      { value: 'iraq', label: 'Iraq' },
      { value: 'ireland', label: 'Ireland' },
      { value: 'isle-of-man', label: 'Isle of Man' },
      { value: 'israel', label: 'Israel' },
      { value: 'italy', label: 'Italy' },
      { value: 'jamaica', label: 'Jamaica' },
      { value: 'japan', label: 'Japan' },
      { value: 'jersey', label: 'Jersey' },
      { value: 'jordan', label: 'Jordan' },
      { value: 'kazakhstan', label: 'Kazakhstan' },
      { value: 'kenya', label: 'Kenya' },
      { value: 'kiribati', label: 'Kiribati' },
      { value: 'korea-democratic-peoples-republic', label: "Korea (Democratic People's Republic)" },
      { value: 'korea-republic', label: 'Korea (Republic)' },
      { value: 'kuwait', label: 'Kuwait' },
      { value: 'kyrgyzstan', label: 'Kyrgyzstan' },
      { value: 'lao-peoples-democratic-republic', label: "Lao People's Democratic Republic" },
      { value: 'latvia', label: 'Latvia' },
      { value: 'lebanon', label: 'Lebanon' },
      { value: 'lesotho', label: 'Lesotho' },
      { value: 'liberia', label: 'Liberia' },
      { value: 'libya', label: 'Libya' },
      { value: 'liechtenstein', label: 'Liechtenstein' },
      { value: 'lithuania', label: 'Lithuania' },
      { value: 'luxembourg', label: 'Luxembourg' },
      { value: 'macao', label: 'Macao' },
      { value: 'madagascar', label: 'Madagascar' },
      { value: 'malawi', label: 'Malawi' },
      { value: 'malaysia', label: 'Malaysia' },
      { value: 'maldives', label: 'Maldives' },
      { value: 'mali', label: 'Mali' },
      { value: 'malta', label: 'Malta' },
      { value: 'marshall-islands', label: 'Marshall Islands' },
      { value: 'martinique', label: 'Martinique' },
      { value: 'mauritania', label: 'Mauritania' },
      { value: 'mauritius', label: 'Mauritius' },
      { value: 'mayotte', label: 'Mayotte' },
      { value: 'mexico', label: 'Mexico' },
      { value: 'micronesia', label: 'Micronesia (Federated States of)' },
      { value: 'moldova', label: 'Moldova' },
      { value: 'monaco', label: 'Monaco' },
      { value: 'mongolia', label: 'Mongolia' },
      { value: 'montenegro', label: 'Montenegro' },
      { value: 'montserrat', label: 'Montserrat' },
      { value: 'morocco', label: 'Morocco' },
      { value: 'mozambique', label: 'Mozambique' },
      { value: 'myanmar', label: 'Myanmar' },
      { value: 'namibia', label: 'Namibia' },
      { value: 'nauru', label: 'Nauru' },
      { value: 'nepal', label: 'Nepal' },
      { value: 'netherlands', label: 'Netherlands' },
      { value: 'new-caledonia', label: 'New Caledonia' },
      { value: 'new-zealand', label: 'New Zealand' },
      { value: 'nicaragua', label: 'Nicaragua' },
      { value: 'niger', label: 'Niger' },
      { value: 'nigeria', label: 'Nigeria' },
      { value: 'niue', label: 'Niue' },
      { value: 'norfolk-island', label: 'Norfolk Island' },
      { value: 'north-macedonia', label: 'North Macedonia' },
      { value: 'northern-mariana-islands', label: 'Northern Mariana Islands' },
      { value: 'norway', label: 'Norway' },
      { value: 'oman', label: 'Oman' },
      { value: 'pakistan', label: 'Pakistan' },
      { value: 'palau', label: 'Palau' },
      { value: 'palestine', label: 'Palestine, State of' },
      { value: 'panama', label: 'Panama' },
      { value: 'papua-new-guinea', label: 'Papua New Guinea' },
      { value: 'paraguay', label: 'Paraguay' },
      { value: 'peru', label: 'Peru' },
      { value: 'philippines', label: 'Philippines' },
      { value: 'pitcairn', label: 'Pitcairn' },
      { value: 'poland', label: 'Poland' },
      { value: 'portugal', label: 'Portugal' },
      { value: 'puerto-rico', label: 'Puerto Rico' },
      { value: 'qatar', label: 'Qatar' },
      { value: 'reunion', label: 'Réunion' },
      { value: 'romania', label: 'Romania' },
      { value: 'russian-federation', label: 'Russian Federation' },
      { value: 'rwanda', label: 'Rwanda' },
      { value: 'saint-barthelemy', label: 'Saint Barthélemy' },
      { value: 'saint-helena-ascension-and-tristan-da-cunha', label: 'Saint Helena, Ascension and Tristan da Cunha' },
      { value: 'saint-kitts-and-nevis', label: 'Saint Kitts and Nevis' },
      { value: 'saint-lucia', label: 'Saint Lucia' },
      { value: 'saint-martin', label: 'Saint Martin (French part)' },
      { value: 'saint-pierre-and-miquelon', label: 'Saint Pierre and Miquelon' },
      { value: 'saint-vincent-and-the-grenadines', label: 'Saint Vincent and the Grenadines' },
      { value: 'samoa', label: 'Samoa' },
      { value: 'san-marino', label: 'San Marino' },
      { value: 'sao-tome-and-principe', label: 'Sao Tome and Principe' },
      { value: 'saudi-arabia', label: 'Saudi Arabia' },
      { value: 'senegal', label: 'Senegal' },
      { value: 'serbia', label: 'Serbia' },
      { value: 'seychelles', label: 'Seychelles' },
      { value: 'sierra-leone', label: 'Sierra Leone' },
      { value: 'singapore', label: 'Singapore' },
      { value: 'sint-maarten', label: 'Sint Maarten (Dutch part)' },
      { value: 'slovakia', label: 'Slovakia' },
      { value: 'slovenia', label: 'Slovenia' },
      { value: 'solomon-islands', label: 'Solomon Islands' },
      { value: 'somalia', label: 'Somalia' },
      { value: 'south-africa', label: 'South Africa' },
      { value: 'south-georgia-and-the-south-sandwich-islands', label: 'South Georgia and the South Sandwich Islands' },
      { value: 'south-sudan', label: 'South Sudan' },
      { value: 'spain', label: 'Spain' },
      { value: 'sri-lanka', label: 'Sri Lanka' },
      { value: 'sudan', label: 'Sudan' },
      { value: 'suriname', label: 'Suriname' },
      { value: 'svalbard-and-jan-mayen', label: 'Svalbard and Jan Mayen' },
      { value: 'sweden', label: 'Sweden' },
      { value: 'switzerland', label: 'Switzerland' },
      { value: 'syrian-arab-republic', label: 'Syrian Arab Republic' },
      { value: 'taiwan', label: 'Taiwan, Province of China' },
      { value: 'tajikistan', label: 'Tajikistan' },
      { value: 'tanzania', label: 'Tanzania, United Republic of' },
      { value: 'thailand', label: 'Thailand' },
      { value: 'timor-leste', label: 'Timor-Leste' },
      { value: 'togo', label: 'Togo' },
      { value: 'tokelau', label: 'Tokelau' },
      { value: 'tonga', label: 'Tonga' },
      { value: 'trinidad-and-tobago', label: 'Trinidad and Tobago' },
      { value: 'tunisia', label: 'Tunisia' },
      { value: 'turkey', label: 'Turkey' },
      { value: 'turkmenistan', label: 'Turkmenistan' },
      { value: 'turks-and-caicos-islands', label: 'Turks and Caicos Islands' },
      { value: 'tuvalu', label: 'Tuvalu' },
      { value: 'uganda', label: 'Uganda' },
      { value: 'ukraine', label: 'Ukraine' },
      { value: 'united-arab-emirates', label: 'United Arab Emirates' },
      { value: 'united-kingdom', label: 'United Kingdom' },
      { value: 'united-states', label: 'United States' },
      { value: 'united-states-minor-outlying-islands', label: 'United States Minor Outlying Islands' },
      { value: 'uruguay', label: 'Uruguay' },
      { value: 'uzbekistan', label: 'Uzbekistan' },
      { value: 'vanuatu', label: 'Vanuatu' },
      { value: 'venezuela', label: 'Venezuela' },
      { value: 'viet-nam', label: 'Viet Nam' },
      { value: 'virgin-islands-british', label: 'Virgin Islands (British)' },
      { value: 'virgin-islands-us', label: 'Virgin Islands (U.S.)' },
      { value: 'wallis-and-futuna', label: 'Wallis and Futuna' },
      { value: 'western-sahara', label: 'Western Sahara' },
      { value: 'yemen', label: 'Yemen' },
      { value: 'zambia', label: 'Zambia' },
      { value: 'zimbabwe', label: 'Zimbabwe' }
  
  ];
  

  const motherTongueOptions = [
    { value: 'english', label: 'English' },
    { value: 'arabic', label: 'Arabic' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'mandarin-chinese', label: 'Mandarin Chinese' },
    { value: 'punjabi', label: 'Punjabi' },
    { value: 'portuguese', label: 'Portuguese' },
    { value: 'russian', label: 'Russian' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'other', label: 'Other' },
  ];

  const countryOptions = [
    { value: 'Afghanistan', label: 'Afghanistan' },
    { value: 'Albania', label: 'Albania' },
    { value: 'Algeria', label: 'Algeria' },
    { value: 'Andorra', label: 'Andorra' },
    { value: 'Angola', label: 'Angola' },
    { value: 'Antigua and Barbuda', label: 'Antigua and Barbuda' },
    { value: 'Argentina', label: 'Argentina' },
    { value: 'Armenia', label: 'Armenia' },
    { value: 'Australia', label: 'Australia' },
    { value: 'Austria', label: 'Austria' },
    { value: 'Azerbaijan', label: 'Azerbaijan' },
    { value: 'Bahamas', label: 'Bahamas' },
    { value: 'Bahrain', label: 'Bahrain' },
    { value: 'Bangladesh', label: 'Bangladesh' },
    { value: 'Barbados', label: 'Barbados' },
    { value: 'Belarus', label: 'Belarus' },
    { value: 'Belgium', label: 'Belgium' },
    { value: 'Belize', label: 'Belize' },
    { value: 'Benin', label: 'Benin' },
    { value: 'Bhutan', label: 'Bhutan' },
    { value: 'Bolivia', label: 'Bolivia' },
    { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
    { value: 'Botswana', label: 'Botswana' },
    { value: 'Brazil', label: 'Brazil' },
    { value: 'Brunei', label: 'Brunei' },
    { value: 'Bulgaria', label: 'Bulgaria' },
    { value: 'Burkina Faso', label: 'Burkina Faso' },
    { value: 'Burundi', label: 'Burundi' },
    { value: 'Cabo Verde', label: 'Cabo Verde' },
    { value: 'Cambodia', label: 'Cambodia' },
    { value: 'Cameroon', label: 'Cameroon' },
    { value: 'Canada', label: 'Canada' },
    { value: 'Central African Republic', label: 'Central African Republic' },
    { value: 'Chad', label: 'Chad' },
    { value: 'Chile', label: 'Chile' },
    { value: 'China', label: 'China' },
    { value: 'Colombia', label: 'Colombia' },
    { value: 'Comoros', label: 'Comoros' },
    { value: 'Congo (Congo-Brazzaville)', label: 'Congo (Congo-Brazzaville)' },
    { value: 'Costa Rica', label: 'Costa Rica' },
    { value: 'Croatia', label: 'Croatia' },
    { value: 'Cuba', label: 'Cuba' },
    { value: 'Cyprus', label: 'Cyprus' },
    { value: 'Czechia', label: 'Czechia' },
    { value: 'Democratic Republic of the Congo', label: 'Democratic Republic of the Congo' },
    { value: 'Denmark', label: 'Denmark' },
    { value: 'Djibouti', label: 'Djibouti' },
    { value: 'Dominica', label: 'Dominica' },
    { value: 'Dominican Republic', label: 'Dominican Republic' },
    { value: 'Ecuador', label: 'Ecuador' },
    { value: 'Egypt', label: 'Egypt' },
    { value: 'El Salvador', label: 'El Salvador' },
    { value: 'Equatorial Guinea', label: 'Equatorial Guinea' },
    { value: 'Eritrea', label: 'Eritrea' },
    { value: 'Estonia', label: 'Estonia' },
    { value: 'Eswatini', label: 'Eswatini' },
    { value: 'Ethiopia', label: 'Ethiopia' },
    { value: 'Fiji', label: 'Fiji' },
    { value: 'Finland', label: 'Finland' },
    { value: 'France', label: 'France' },
    { value: 'Gabon', label: 'Gabon' },
    { value: 'Gambia', label: 'Gambia' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Germany', label: 'Germany' },
    { value: 'Ghana', label: 'Ghana' },
    { value: 'Greece', label: 'Greece' },
    { value: 'Grenada', label: 'Grenada' },
    { value: 'Guatemala', label: 'Guatemala' },
    { value: 'Guinea', label: 'Guinea' },
    { value: 'Guinea-Bissau', label: 'Guinea-Bissau' },
    { value: 'Guyana', label: 'Guyana' },
    { value: 'Haiti', label: 'Haiti' },
    { value: 'Holy See', label: 'Holy See' },
    { value: 'Honduras', label: 'Honduras' },
    { value: 'Hungary', label: 'Hungary' },
    { value: 'Iceland', label: 'Iceland' },
    { value: 'India', label: 'India' },
    { value: 'Indonesia', label: 'Indonesia' },
    { value: 'Iran', label: 'Iran' },
    { value: 'Iraq', label: 'Iraq' },
    { value: 'Ireland', label: 'Ireland' },
    { value: 'Israel', label: 'Israel' },
    { value: 'Italy', label: 'Italy' },
    { value: 'Jamaica', label: 'Jamaica' },
    { value: 'Japan', label: 'Japan' },
    { value: 'Jordan', label: 'Jordan' },
    { value: 'Kazakhstan', label: 'Kazakhstan' },
    { value: 'Kenya', label: 'Kenya' },
    { value: 'Kiribati', label: 'Kiribati' },
    { value: 'Kuwait', label: 'Kuwait' },
    { value: 'Kyrgyzstan', label: 'Kyrgyzstan' },
    { value: 'Laos', label: 'Laos' },
    { value: 'Latvia', label: 'Latvia' },
    { value: 'Lebanon', label: 'Lebanon' },
    { value: 'Lesotho', label: 'Lesotho' },
    { value: 'Liberia', label: 'Liberia' },
    { value: 'Libya', label: 'Libya' },
    { value: 'Liechtenstein', label: 'Liechtenstein' },
    { value: 'Lithuania', label: 'Lithuania' },
    { value: 'Luxembourg', label: 'Luxembourg' },
    { value: 'Madagascar', label: 'Madagascar' },
    { value: 'Malawi', label: 'Malawi' },
    { value: 'Malaysia', label: 'Malaysia' },
    { value: 'Maldives', label: 'Maldives' },
    { value: 'Mali', label: 'Mali' },
    { value: 'Malta', label: 'Malta' },
    { value: 'Marshall Islands', label: 'Marshall Islands' },
    { value: 'Mauritania', label: 'Mauritania' },
    { value: 'Mauritius', label: 'Mauritius' },
    { value: 'Mexico', label: 'Mexico' },
    { value: 'Micronesia', label: 'Micronesia' },
    { value: 'Moldova', label: 'Moldova' },
    { value: 'Monaco', label: 'Monaco' },
    { value: 'Mongolia', label: 'Mongolia' },
    { value: 'Montenegro', label: 'Montenegro' },
    { value: 'Morocco', label: 'Morocco' },
    { value: 'Mozambique', label: 'Mozambique' },
    { value: 'Myanmar', label: 'Myanmar' },
    { value: 'Namibia', label: 'Namibia' },
    { value: 'Nauru', label: 'Nauru' },
    { value: 'Nepal', label: 'Nepal' },
    { value: 'Netherlands', label: 'Netherlands' },
    { value: 'New Zealand', label: 'New Zealand' },
    { value: 'Nicaragua', label: 'Nicaragua' },
    { value: 'Niger', label: 'Niger' },
    { value: 'Nigeria', label: 'Nigeria' },
    { value: 'North Korea', label: 'North Korea' },
    { value: 'North Macedonia', label: 'North Macedonia' },
    { value: 'Norway', label: 'Norway' },
    { value: 'Oman', label: 'Oman' },
    { value: 'Pakistan', label: 'Pakistan' },
    { value: 'Palau', label: 'Palau' },
    { value: 'Palestine', label: 'Palestine' },
    { value: 'Panama', label: 'Panama' },
    { value: 'Papua New Guinea', label: 'Papua New Guinea' },
    { value: 'Paraguay', label: 'Paraguay' },
    { value: 'Peru', label: 'Peru' },
    { value: 'Philippines', label: 'Philippines' },
    { value: 'Poland', label: 'Poland' },
    { value: 'Portugal', label: 'Portugal' },
    { value: 'Qatar', label: 'Qatar' },
    { value: 'Romania', label: 'Romania' },
    { value: 'Russia', label: 'Russia' },
    { value: 'Rwanda', label: 'Rwanda' },
    { value: 'Saint Kitts and Nevis', label: 'Saint Kitts and Nevis' },
    { value: 'Saint Lucia', label: 'Saint Lucia' },
    { value: 'Saint Vincent and the Grenadines', label: 'Saint Vincent and the Grenadines' },
    { value: 'Samoa', label: 'Samoa' },
    { value: 'San Marino', label: 'San Marino' },
    { value: 'Sao Tome and Principe', label: 'Sao Tome and Principe' },
    { value: 'Saudi Arabia', label: 'Saudi Arabia' },
    { value: 'Senegal', label: 'Senegal' },
    { value: 'Serbia', label: 'Serbia' },
    { value: 'Seychelles', label: 'Seychelles' },
    { value: 'Sierra Leone', label: 'Sierra Leone' },
    { value: 'Singapore', label: 'Singapore' },
    { value: 'Slovakia', label: 'Slovakia' },
    { value: 'Slovenia', label: 'Slovenia' },
    { value: 'Solomon Islands', label: 'Solomon Islands' },
    { value: 'Somalia', label: 'Somalia' },
    { value: 'South Africa', label: 'South Africa' },
    { value: 'South Korea', label: 'South Korea' },
    { value: 'South Sudan', label: 'South Sudan' },
    { value: 'Spain', label: 'Spain' },
    { value: 'Sri Lanka', label: 'Sri Lanka' },
    { value: 'Sudan', label: 'Sudan' },
    { value: 'Suriname', label: 'Suriname' },
    { value: 'Sweden', label: 'Sweden' },
    { value: 'Switzerland', label: 'Switzerland' },
    { value: 'Syria', label: 'Syria' },
    { value: 'Tajikistan', label: 'Tajikistan' },
    { value: 'Tanzania', label: 'Tanzania' },
    { value: 'Thailand', label: 'Thailand' },
    { value: 'Timor-Leste', label: 'Timor-Leste' },
    { value: 'Togo', label: 'Togo' },
    { value: 'Tonga', label: 'Tonga' },
    { value: 'Trinidad and Tobago', label: 'Trinidad and Tobago' },
    { value: 'Tunisia', label: 'Tunisia' },
    { value: 'Turkey', label: 'Turkey' },
    { value: 'Turkmenistan', label: 'Turkmenistan' },
    { value: 'Tuvalu', label: 'Tuvalu' },
    { value: 'Uganda', label: 'Uganda' },
    { value: 'Ukraine', label: 'Ukraine' },
    { value: 'United Arab Emirates', label: 'United Arab Emirates' },
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'United States', label: 'United States' },
    { value: 'Uruguay', label: 'Uruguay' },
    { value: 'Uzbekistan', label: 'Uzbekistan' },
    { value: 'Vanuatu', label: 'Vanuatu' },
    { value: 'Venezuela', label: 'Venezuela' },
    { value: 'Vietnam', label: 'Vietnam' },
    { value: 'Yemen', label: 'Yemen' },
    { value: 'Zambia', label: 'Zambia' },
    { value: 'Zimbabwe', label: 'Zimbabwe' }
  ];

  const handleDropdownToggle = (dropdownId: string, isOpen: boolean) => {
    setOpenDropdown(isOpen ? dropdownId : null);
  };

  return (
    <div className="bg-white p-2 sm:p-3 md:p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-2 sm:mb-3 md:mb-4">
        <Home className="text-red-600" size={18} />
        <div>
          <h2 className="text-base font-bold text-gray-900">Family & Background</h2>
          <p className="text-xs text-gray-600">Tell us about your family and background</p>
        </div>
      </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <FormField label="Marital Status" required error={showErrors ? errors.maritalStatus : undefined}>
          <CustomDropdown
            options={maritalOptions}
            value={data.maritalStatus}
            placeholder="Marital Status"
            onChange={(value) => onChange({ maritalStatus: value })}
            isOpen={openDropdown === 'marital'}
            onToggle={(isOpen) => handleDropdownToggle('marital', isOpen)}
          />
        </FormField>

  <FormField label="Children" required error={showErrors ? errors.children : undefined}>
          <CustomDropdown
            options={childrenOptions}
            value={data.children}
            placeholder="Do You Have Children?"
            onChange={(value) => onChange({ children: value })}
            isOpen={openDropdown === 'children'}
            onToggle={(isOpen) => handleDropdownToggle('children', isOpen)}
          />
        </FormField>

  <FormField label="Do You Want Children?" required error={showErrors ? errors.wantChildren : undefined}>
          <CustomDropdown
            options={wantChildrenOptions}
            value={data.wantChildren}
            placeholder="Do You Want Children?"
            onChange={(value) => onChange({ wantChildren: value })}
            isOpen={openDropdown === 'Do You Want Children?'}
            onToggle={(isOpen) => handleDropdownToggle('Do You Want Children?', isOpen)}
          />
        </FormField>

  <FormField label="Nationality" required error={showErrors ? errors.nationality : undefined}>
          <CustomDropdown
            options={nationalityOptions}
            value={data.nationality}
            placeholder="Nationality"
            onChange={(value) => onChange({ nationality: value })}
            isOpen={openDropdown === 'nationality'}
            onToggle={(isOpen) => handleDropdownToggle('nationality', isOpen)}
          />
        </FormField>


  <FormField label="Mother Tongue" required error={showErrors ? errors.motherTongue : undefined}>
    <CustomDropdown
      options={motherTongueOptions}
      value={data.motherTongue ? data.motherTongue.toLowerCase() : ''}
      placeholder="Mother Tongue"
      onChange={(value) => {
        // Set value as label (capitalized) for display, but store value for consistency
        const selected = motherTongueOptions.find(opt => opt.value === value);
        onChange({ motherTongue: selected ? selected.label : value });
      }}
      isOpen={openDropdown === 'motherTongue'}
      onToggle={(isOpen) => handleDropdownToggle('motherTongue', isOpen)}
    />
  </FormField>

        <FormField label="Languages Known">
          <input
            type="text"
            value={data.languagesKnown}
            onChange={(e) => onChange({ languagesKnown: e.target.value })}
            placeholder="e.g., English, Arabic, Urdu"
            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors"
          />
        </FormField>

  <FormField label="Country" required error={showErrors ? errors.country : undefined}>
          <CustomDropdown
            options={countryOptions}
            value={data.country}
            placeholder="Country"
            onChange={(value) => onChange({ country: value })}
            isOpen={openDropdown === 'country'}
            onToggle={(isOpen) => handleDropdownToggle('country', isOpen)}
          />
        </FormField>

  <FormField label="City" required error={showErrors ? errors.city : undefined}>
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder="City"
            className="w-full p-2 bg-gray-50 border border-gray-200 rounded-lg hover:border-gray-300 focus:outline-none focus:border-red-300 focus:ring-1 focus:ring-red-200 transition-colors"
          />
        </FormField>
      </div>
    </div>
  );
};