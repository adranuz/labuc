import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import EngineeringIcon from '@mui/icons-material/Engineering'
import PersonIcon from '@mui/icons-material/Person'
import SupportAgentIcon from '@mui/icons-material/SupportAgent'

function CustomerContacts ({contacts, readOnly}) {
  console.log(readOnly)
  
  return (
    <>
      <List>
        {contacts?.map(contact => {
          return (
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: useTheme().palette.secondary.light }}>
                  { contact.type === 'tec' && <EngineeringIcon /> }
                  { contact.type === 'com' && <SupportAgentIcon /> }
                  { contact.type !== 'tec' && contact.type !== 'com' && <PersonIcon /> }
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={contact.name} secondary={contact.email} />
            </ListItem>
          )
        })}
      </List>
    </>
  )
}

export default CustomerContacts
