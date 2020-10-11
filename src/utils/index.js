import { format, formatDistance, formatRelative, subDays } from 'date-fns';
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

export const formatDistanceDate = (date) => {
  try {
    return formatDistance(new Date(date), new Date(), {
      addSuffix: true,
      locale: fr,
    });
  } catch (err) {
    console.log(err.message, date);
    try {
      return formatDistance(date, new Date(), {
        addSuffix: true,
        locale: fr,
      });
    } catch (err) {
      console.log(err.message);
      return '';
    }
  }
};

export const findNoteColor = (note) => {
  if (!Boolean(note)) {
    return theme.colors.ternary;
  }

  if (note < 3) {
    return theme.colors.ternary;
  }

  if (note >= 3 && note < 6) {
    return theme.colors.warning;
  }

  if (note >= 6 && note < 8) {
    return theme.colors.success;
  }

  if (note >= 8) {
    return theme.colors.primary;
  }
};
