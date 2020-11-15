import { format, formatDistanceStrict } from 'date-fns';
import { fr } from 'date-fns/locale';
import { theme } from 'ui';

export const ERRORS = {
  REQUIRED: 'Ce champ est requis',
  TAKEN: 'Cette valeur est déjà prise',
  INVALID: 'Cette valeur n’est pas valide',
  EMAIL: 'Cette adresse mail n’est pas valide',
  EMAIL_NOT_FOUND: 'Cette adresse mail n’est pas enregistrée',
  CONFIRMATION_TOKEN_INVALID: "Ce lien n'est plus valide",
  MIN_SIX: '6 caractères minimum',
  NOT_FOUND: 'Ce véhicule n’existe pas en base',
  INVALID_GRANT: 'Votre email ou mot de mot de passe est incorrect.',
  PASSWORDS_DO_NOT_MATCH: 'Les mots de passe ne concordent pas',
  CURRENT_PASSWORD_INVALID: 'Votre mot de passe actuel est erroné',
};

export const pluralize = (input, count) =>
  input
    .split(' ')
    .map(i => `${i}${count > 1 ? 's' : ''}`)
    .join(' ');

export const formatDate = (date, frmt) => {
  try {
    return format(new Date(date), frmt, { locale: fr });
  } catch (err) {
    console.log(err.message, date);
    try {
      return format(date, frmt, { locale: fr });
    } catch (err) {
      console.log(err.message);
      return '';
    }
  }
};

export const formatDistanceDate = ({ date, addSuffix = true }) => {
  try {
    return formatDistanceStrict(new Date(date), new Date(), {
      addSuffix: addSuffix,
      locale: fr,
    });
  } catch (err) {
    console.log(err.message, date);
    try {
      return formatDistanceStrict(date, new Date(), {
        addSuffix: addSuffix,
        locale: fr,
      });
    } catch (err) {
      console.log(err.message);
      return '';
    }
  }
};
