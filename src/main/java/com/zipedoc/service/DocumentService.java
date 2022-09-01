package com.zipedoc.service;

import com.zipedoc.domain.Document;
import com.zipedoc.domain.User;
import com.zipedoc.repository.DocumentRepository;
import java.util.Collections;
import java.util.List;
import javax.print.Doc;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DocumentService {

    private final Logger log = LoggerFactory.getLogger(DocumentService.class);

    private final DocumentRepository documentRepository;

    private final UserService userService;

    public DocumentService(DocumentRepository documentRepository, UserService userService) {
        this.documentRepository = documentRepository;
        this.userService = userService;
    }

    public Document addUserAssociationPostDocument(Document document) {
        User user = userService.getUserWithAuthorities().orElseGet(User::new);
        document.setUserName(user);
        document.sets3key("zipedoc/" + user.getLogin() + "/" + document.getDocumentTitle() + ".txt");
        return documentRepository.save(document);
    }

    public List<Document> sortDocumentsByModifiedDateMostRecentFirst() {
        List<Document> documentList = documentRepository.findByUserNameIsCurrentUser();
        Collections.sort(documentList);
        return documentList;
    }
}
