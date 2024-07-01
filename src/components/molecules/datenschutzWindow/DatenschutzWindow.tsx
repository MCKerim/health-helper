import React, { useState } from "react";
import ContentBox from "../../atoms/contentBox/ContentBox";
import "./DatenschutzWindow.css";
import ActionButton from "../../atoms/actionButton/ActionButton";
import Notification from "../../atoms/notification/Notification"; // Assuming Notification is saved here
import { auth, deleteAllChatsByUID } from "../../../firebase";

const DatenschutzWindow = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleDeleteChats = async () => {
    try {
      await deleteAllChatsByUID(auth.currentUser?.uid);
      setShowNotification(true); // Show notification on successful deletion
    } catch (error) {
      console.error("Failed to delete chats:", error);
      // Optionally handle errors (e.g., show error notification)
    }
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  return (
      <div className={"DatenschutzContainer"}>
          <ContentBox>
              <p>
                  Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. In diesem Datenschutzhinweis informieren
                  wir Sie darüber, welche Daten wir speichern, wie wir diese verwenden und welche Rechte Sie in Bezug
                  auf Ihre Daten haben.
              </p>
          </ContentBox>

          <ContentBox>
              <p>
                  <strong>Welche Daten speichern wir?</strong><br/>
                  Wir speichern hauptsächlich zwei Arten von Daten:
              </p>
              <ul>
                  <li><strong>Chats:</strong> Alle von Ihnen geführten Chats werden gespeichert. Diese Chats enthalten
                      die Nachrichten, die Sie während der Interaktion mit unserem System gesendet und empfangen haben.
                  </li>
                  <li><strong>Relevante Accountinformationen:</strong> Hierzu gehören Informationen, die notwendig sind,
                      um Ihr Konto zu verwalten und Ihnen einen reibungslosen Service zu bieten. Dies kann Ihre
                      E-Mail-Adresse, Benutzername, Präferenzen und andere ähnliche Informationen umfassen.
                  </li>
              </ul>
          </ContentBox>

          <ContentBox>
              <p>
                  <strong>Verwendungszwecke der gespeicherten Daten</strong><br/>
                  Die von uns gespeicherten Daten werden für verschiedene Zwecke verwendet:
              </p>
              <ul>
                  <li><strong>Servicebereitstellung:</strong> Die Chats und Accountinformationen helfen uns dabei, Ihnen
                      unseren Dienst zur Verfügung zu stellen und Ihre Anfragen zu bearbeiten.
                  </li>
                  <li><strong>Feedback und Verbesserung des Modells:</strong> Um unseren Service kontinuierlich zu
                      verbessern, verwenden wir möglicherweise ausgewählte Nachrichten für Feedbackzwecke. Diese
                      ausgewählten Nachrichten helfen uns dabei, das zugrunde liegende Modell zu optimieren und Ihre
                      Benutzererfahrung zu verbessern.
                  </li>
              </ul>
          </ContentBox>

          <ContentBox>
              <p>
                  <strong>Löschung Ihrer Daten</strong><br/>
                  Sie haben jederzeit das Recht, Ihre Daten zu löschen. Wenn Sie möchten, dass Ihre Chats und
                  Accountinformationen gelöscht werden, können Sie uns dies mitteilen, und wir werden Ihre Daten aus
                  unseren Systemen entfernen. Um die Löschung Ihrer Daten zu beantragen, kontaktieren Sie bitte unseren
                  Support.
              </p>
          </ContentBox>

          <ContentBox>
              <p>
                  <strong>Ihre Rechte</strong><br/>
                  Neben dem Recht auf Löschung haben Sie auch das Recht auf:
              </p>
              <ul>
                  <li><strong>Auskunft:</strong> Sie können jederzeit Auskunft darüber verlangen, welche Daten wir über
                      Sie gespeichert haben.
                  </li>
                  <li><strong>Berichtigung:</strong> Wenn Sie feststellen, dass wir unrichtige oder unvollständige Daten
                      über Sie gespeichert haben, können Sie die Berichtigung dieser Daten verlangen.
                  </li>
                  <li><strong>Widerspruch:</strong> Sie können der Verarbeitung Ihrer Daten aus bestimmten Gründen
                      widersprechen.
                  </li>
                  <li><strong>Einschränkung der Verarbeitung:</strong> Unter bestimmten Umständen können Sie die
                      Einschränkung der Verarbeitung Ihrer Daten verlangen.
                  </li>
              </ul>
          </ContentBox>

          <ContentBox>
              <p>
                  <strong>Kontakt</strong><br/>
                  Bei Fragen oder Anliegen zu diesem Datenschutzhinweis oder zur Verarbeitung Ihrer Daten können Sie
                  sich jederzeit an unseren Datenschutzbeauftragten wenden. Die Kontaktdaten finden Sie auf unserer
                  Website.
              </p>
          </ContentBox>

          <ContentBox>
              <p>
                  Wir danken Ihnen für Ihr Vertrauen und versichern Ihnen, dass wir Ihre Daten mit höchster Sorgfalt
                  behandeln.
              </p>
          </ContentBox>

          <ActionButton onClick={handleDeleteChats} label="Chats löschen"/>

          {showNotification && (
              <Notification
                  message="Alle Chats wurden erfolgreich gelöscht."
                  onClose={closeNotification}
              />
          )}
      </div>

  );
};

export default DatenschutzWindow;
