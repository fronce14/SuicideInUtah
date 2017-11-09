library(tidyverse)
ggplot(data = suicideage, aes(x = Sex, y = Suicide.Rate, col = Age.Group)) +
  geom_col(position = "dodge")  # geom_col is an alternative to geom_bar that allows for y to be used without setting stat = "identity"

ggplot(data = suicideage, aes(x = Sex, y = Suicide.Rate)) +
  geom_col() +
  facet_wrap(~Age.Group) +
  ggtitle("Suicide Rates In Utah by Age Group") +
  xlab("") + ylab("")
