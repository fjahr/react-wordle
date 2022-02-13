import { BaseModal } from './BaseModal'

type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const AboutModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="About" isOpen={isOpen} handleClose={handleClose}>
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Seedle is a word guessing game using the BIP39 word list. You always only
        have to guess the first 4 letters of the word. For guessing words with less
        than 4 letters you have to set the last letters as spaces (the empty key at
        the end of the middle row).
        <br/><br/>
        The project is based on this {' '}
        <a
          href="https://github.com/cwackerfuss/react-wordle"
          className="underline"
        >
          awesome open source project
        </a>{' '}
      </p>
    </BaseModal>
  )
}
