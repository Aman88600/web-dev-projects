document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // form selector
  document.querySelector("#compose-form").addEventListener('submit', send_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {
  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#archive').style.display = 'none';
  document.querySelector('#open-email').style.display = 'none';


  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}


// Here we open the clicked email
function open_email(id, mailbox){

  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#open-email').style.display = 'block';
  document.querySelector('#archive').style.display = 'none';
  fetch(`/emails/${id}`)
.then(response => response.json())
.then(email => {
    // Print email
    console.log(email);
    document.querySelector('#open-email').innerHTML = `<ul class="list-group">
  <li class="list-group-item"><strong>Sender</strong> : ${email.sender}</li>
  <li class="list-group-item"><strong>Recipient</strong> : ${email.recipients[0]}</li>
  <li class="list-group-item"><strong>Subject</strong> : ${email.subject}</li>
  <li class="list-group-item"><strong>TimeStamp</strong> : ${email.timestamp}</li>
  <li class="list-group-item"><strong>Body</strong> : ${email.body}</li>
</ul>`;
  if(!email.read)
  {
      fetch(`/emails/${email.id}`, {
      method: 'PUT',
      body: JSON.stringify({
      read: true
      })
      })
  }
  
  if (mailbox === 'inbox')
  {
    reply = document.createElement('button');
    reply.className = "btn btn-primary";
    reply.textContent = "Reply";
    archive = document.createElement('button');
    archive.className = "btn btn-danger";
    archive.textContent = "Archive";
    document.querySelector('#open-email').append(reply);
    document.querySelector('#open-email').append(archive);

    archive.addEventListener('click', function(){
      console.log("archived");
      if(!email.archived)
      {
          fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
          archived: true
          })
          })
      }
      load_mailbox('inbox');
      location.reload();
    });
    reply.addEventListener('click', function(){
        // Show compose view and hide other views
        document.querySelector('#emails-view').style.display = 'none';
        document.querySelector('#compose-view').style.display = 'block';
        document.querySelector('#archive').style.display = 'none';
        document.querySelector('#open-email').style.display = 'none';

        // Clear out composition fields
        document.querySelector('#compose-recipients').value = email.sender;
        // Check if subject starts with "Re"
        if (!email.subject.startsWith('Re: ')) {
          document.querySelector('#compose-subject').value = `Re: ${email.subject}`;
        }
        else{
          document.querySelector('#compose-subject').value = `${email.subject}`;
        }

        
        document.querySelector('#compose-body').value = `On ${email.timestamp} ${email.sender} wrote: ${email.body}`;
    });
  }

  if(mailbox === 'archive')
  {

    unarchive = document.createElement('button');

    unarchive.className = "btn btn-danger";

    unarchive.textContent = "Unarchive";

    document.querySelector('#open-email').append(unarchive);
    unarchive.addEventListener('click', function(){
      if(email.archived)
      {
          fetch(`/emails/${email.id}`, {
          method: 'PUT',
          body: JSON.stringify({
          archived: false
          })
          })
      }
      load_mailbox('inbox');
      location.reload();
    });
  }
    // ... do something else with email ...
});
  



}


function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#open-email').style.display = 'none';
  document.querySelector('#archive').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  if(mailbox === 'sent'){
    function_mailbox(mailbox);
  }
  else if(mailbox === 'inbox')
  {
    function_mailbox(mailbox);
  }

  else if(mailbox === 'archive')
  {
    function_mailbox(mailbox);
  }
}


// send_email
function send_email (event){
  // This stops the console form clearing
  event.preventDefault();

  // This access the values of fields and stores them in constant variables
  const recipient = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  // This will send the email
    fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipient,
        subject: subject,
        body: body
    })
  })
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
      load_mailbox('sent');
  });

  localStorage.clear();
  // Send to user to sent mailbox
  
}

function function_mailbox(mailbox)
{
  fetch(`/emails/${mailbox}`)
    .then(response => response.json())
    .then(emails => {
    // Print emails
    console.log(emails);

    // ... do something else with emails ...
      emails.forEach(email => {
          
            const element = document.createElement('div');
            element.className = 'list-group-item';
            if(!email.archived)
            {
            if(mailbox === 'sent')
            {
              element.innerHTML = `<div>
              <div>recipient : ${email.recipients[0]} </div>
              <div>Subject : ${email.subject} </div> 
              <div>${email.timestamp}</div> </div>`;
            }
            else if(mailbox === 'inbox')
            {
              element.innerHTML = `<div>
              <div>sender : ${email.sender} </div>
              <div>Subject : ${email.subject} </div> 
              <div>${email.timestamp}</div> </div>`;
            }
            }
            else if(mailbox === 'archive')
            {
              element.innerHTML = `<div>
              <div>sender : ${email.sender} </div>
              <div>Subject : ${email.subject} </div> 
              <div>${email.timestamp}</div> </div>`;
            }
            element.addEventListener('click', function() {
            console.log('This element has been clicked!')
            // Now we are going to make a funciton to open the email
            open_email(email.id, mailbox);
            });
            if(email.read === false)
            {
              element.style.backgroundColor = 'white';
            }
            else{
              element.style.backgroundColor = 'grey';
            }
            document.querySelector('#emails-view').append(element);
      })
    });

}

