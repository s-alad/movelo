import Navbar from "@/components/ui/Navbar";
import styles from "@/styles/Contact.module.scss";
import { useRef, useState } from "react";

type InputState = {
    height?: string;
    fontSize?: string;
};
  

export default function Form() {

    const [inputStates, setInputStates] = useState<Record<string, InputState>>({});
    let heightRef = useRef(6);
    let fontSizeRef = useRef(3.5);

    const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const textarea = event.target;
        const maxHeight = 24;
        if (textarea.scrollHeight > textarea.clientHeight && heightRef.current < maxHeight) {
            setInputStates((prevStates) => ({
                ...prevStates,
                [textarea.id]: {
                    height: `${heightRef.current += 4}vh`,
                },
            }));
        } else if (heightRef.current >= maxHeight) {
            setInputStates((prevStates) => ({
                ...prevStates,
                [textarea.id]: {
                    height: `${maxHeight}vh`,
                    fontSize: `2vh`,
                },
            }));
        }
    };

  return (
    <>
      <Navbar />
      <form className={styles.form}>
        <label htmlFor="name">Name</label>
        <textarea
          id="name"
          onInput={handleInputChange}
          style={inputStates.name as React.CSSProperties}
        />
        <label htmlFor="email">Email</label>
        <textarea
          id="email"
          onInput={handleInputChange}
          style={inputStates.email as React.CSSProperties}
        />
        <label htmlFor="company">Company you represent</label>
        <textarea
          id="company"
          onInput={handleInputChange}
          style={inputStates.company as React.CSSProperties}
        />
        <label htmlFor="other">Comments</label>
        <textarea
          id="other"
          onInput={handleInputChange}
          style={inputStates.other as React.CSSProperties}
        />
        <div className={styles.buttonContainer}>
          <input type="submit" value="Submit" className={styles.buttons} />
          <input type="reset" value="Reset" className={styles.buttons} />
        </div>
      </form>
    </>
  );
}