read.csv("suicidebyrace.csv")
library(tidyverse)
data("suicidebyrace.csv")
suicidebar <- read.csv("suicidebyrace.csv")


ggplot(data = suicidebar, aes(x = Race, y = Suicide.Rate, fill = Race)) +
  geom_bar(colour = "black", stat = "identity") +
  scale_fill_manual(values = c("grey","red3","orange","white","yellow2","orangered1")) +
  theme(axis.text.x = element_blank()) +
  ggtitle("Suicide Rates In Utah By Race") +
  xlab("") + ylab("")
