import { Avatar, Box, CardActionArea, CardMedia } from '@mui/material'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import styles from '../styles/components/CardBlog.module.scss'

interface CardBlogProps {
  title: string
  description: string
  author: string
  created: number
}

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const CardBlog = ({
  title,
  description,
  author,
  created,
}: CardBlogProps) => {
  const formartDate = (param: number) => {
    const d = new Date(param)

    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear()
  }

  return (
    <Card className={styles.card}>
      <CardActionArea>
        <CardMedia
          className={styles.media}
          image="https://via.placeholder.com/250x400/f5f2f2/969696"
          title="Contemplative Reptile"
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={styles.cardActions}>
        <Box className={styles.author}>
          <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
          <Box ml={2}>
            <Typography variant="subtitle2" component="p">
              {author}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" component="p">
              {formartDate(created)}
            </Typography>
          </Box>
        </Box>
      </CardActions>
    </Card>
  )
}
