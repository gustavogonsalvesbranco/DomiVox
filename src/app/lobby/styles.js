import { StyleSheet } from 'react-native';
import { color } from '../../colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.bg,
    padding: 16,
  },

  header: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  code: {
    fontSize: 18,
    color: color.foreground,
    fontWeight: 'bold',
    marginTop: 20,
  },

  back: {
    width: 40,
    height: 40,
    backgroundColor: color.comment,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },

  statusText: {
    color: color.yellow,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 10,
  },

  players: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },

  player: {
    width: '48%',
    backgroundColor: color.comment,
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: color.primary,
  },

  playerName: {
    color: color.foreground,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },

  startButton: {
    width: '90%',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  startButtonEnabled: {
    backgroundColor: color.comment,
  },

  startButtonDisabled: {
    backgroundColor: color.currentLine,
    opacity: 0.5,
  },

  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: color.foreground,
  },
});